from collections import defaultdict

import numpy as np
import matplotlib.pyplot as plt
import json
from mpl_toolkits.mplot3d import Axes3D

import seaborn as sns
import pandas as pd


class Environment:

    """ The mdp is for the skill acquisition mdp and with objective level environment of space ship travel.
    The space ship game environment has to be episodic, or else, it makes no sense, because one can't travel away
    from the destination"""

    def __init__(self, gamma):
        self.nS1 = 3
        self.nS2 = 26
        self.goal = 20
        self.gamma = gamma
        self.actions = [1, 2]
        self.nA = len(self.actions)
        self.total_distance = 10
        self.states = [(d, k1, k2)
                       for d in range(1, self.total_distance + 1)
                       for k1 in range(1, self.nS1 + 1)
                       for k2 in range(1, self.nS2 + 1)]

    def reset_distance(self):
        # return np.random.randint(4, self.total_distance + 1)
        return self.total_distance

    # Return the next states given current state
    def step(self, cur_state, action):

        d, k1, k2 = cur_state
        # if reaching the goal, d will be randomly set between [3, total_distance]

        next_states = defaultdict(list)  # key: next_state, values: transition_prob, reward

        # try skill 1
        if action == self.actions[0]:
            # if skill 1 is not acquired
            if k1 > 1:
                # if getting error trying skill 1, the position in the objective mdp does not change
                # and reward = -1
                reward = -1

                next_state = (1 - (1 / k1), reward)
                next_states[(d, k1 - 1, k2)].append(next_state)
                # print(f"next_state with action k1: {d, k1-1, k2}")

                # if getting the skill 1, the player move one step further in obj-mdp, and get reward -1 if
                # he's not reached the goal
                d -= 1
                if d == 0:
                    reward = self.goal - 1
                    # reset the game environment
                    d = self.reset_distance()
                if (d, 1, k2) in next_states:
                    next_states[(d, 1, k2)].append((1/k1, reward))
                else:
                    next_states[(d, 1, k2)] = [(1/k1, reward)]

                # print(f"next_state with action k1: {d, 1, k2}")

            # if skill 1 is acquired
            else:
                assert k1 == 1

                d -= 1
                if d == 0:
                    reward = self.goal - 1
                    # reset the game environment
                    d = self.reset_distance()

                else:
                    reward = -1
                next_states[(d, 1, k2)] = [(1, reward)]
                # print(f"next_state with action k1: {d, 1, k2}")

        elif action == self.actions[1]:
            # if skill 2 is not acquired
            if k2 > 1:
                # if getting error when trying skill 2, the player would get reward -1
                reward = -1
                if (d, k1, k2 - 1) in next_states:
                    next_states[(d, k1, k2 - 1)].append((1 - (1/k2), reward))
                else:
                    next_states[(d, k1, k2 - 1)] = [(1 - (1/k2), reward)]
                # print(f"next_state with action k2: {d, k1, k2-1}")

                # if getting the right key of skill 2, the player would get reward goal - 1
                # and reaching the destination.
                reward = self.goal - 1
                # reward = 2 * self.goal - 1
                # d will be reset to a random number between 3 and total_distance, game reset
                d = self.reset_distance()
                if (d, k1, 1) in next_states:
                    next_states[(d, k1, 1)].append((1/k2, reward))
                else:
                    next_states[(d, k1, 1)] = [(1/k2, reward)]
                # print(f"next_state with action k2: {d, k1, 1}")


            # if skill 2 is already acquired
            else:
                reward = self.goal - 1
                # reward = 2 * self.goal - 1

                # d = 0
                # d will be reset to a random number between 3 and total_distance, game reset
                d = self.reset_distance()
                next_states[(d, k1, 1)] = [(1, reward)]

        return next_states


# return the converged value function of given policy
def policy_evaluation(policy, env):

    gamma = env.gamma
    states = env.states
    actions = env.actions
    V = {state: 0 for state in states}

    iteration = 0

    while True:

        delta = 0

        for state in states:
            d, k1, k2 = state

            v = 0

            for action, action_prob in enumerate(policy[(d, k1, k2)]):

                next_states = env.step((d, k1, k2), actions[action])

                for next_state, values in next_states.items():
                    # iterate all the values saved in one next state, in case there are more than 1 value tuples
                    for value in values:
                        state_prob, reward = value
                        v += action_prob * state_prob * (reward + gamma * V[next_state])

            delta = max(delta, np.abs(V[state] - v))
            V[state] = v

        iteration += 1

        if delta < 1e-4:
            break
    return V


def one_step_lookahead(state, V, env):
    gamma = env.gamma
    actions = env.actions
    A = np.zeros(len(actions))

    for action in range(len(A)):
        next_states = env.step(state, actions[action])
        for next_state, values in next_states.items():
            for value in values:
                state_prob, reward = value
                A[action] += state_prob * (reward + gamma * V[next_state])
    return A


def policy_iteration(env):

    actions = env.actions
    states = env.states

    policy = {state: np.ones(len(actions))/len(actions) for state in states}

    while True:

        V = policy_evaluation(policy, env)

        policy_stable = True
        policy_change = 0

        for state in states:
            d, k1, k2 = state

            chosen_a = np.argmax(policy[(d, k1, k2)])
            action_values = one_step_lookahead((d, k1, k2), V, env)
            # print(f"action_values at state{d, k1, k2}: {action_values}")
            best_action = np.argmax(action_values)
            # print(f"best_action at state {d, k1, k2}: {best_action}")
            if best_action != chosen_a:
                policy_change += 1
                policy_stable = False
            policy[state] = np.eye(len(actions))[best_action]
        print("policy change in {} states".format(policy_change))

        if policy_stable:
            return policy, V


def value_iteration(env, gamma, theta=1e-4):
    def one_step_lookahead(state, V):
        A = np.zeros(env.nA)
        for a in range(env.nA):
            next_states = env.step(state, env.actions[a])
            for next_state, values in next_states.items():
                for value in values:
                    state_prob, reward = value
                    A[a] += state_prob * (reward + gamma * V[next_state])
        return A

    V = {state: 0 for state in env.states}

    while True:
        delta = 0
        for state in env.states:
            A = one_step_lookahead(state, V)
            best_action_value = np.max(A)
            delta = max(delta, np.abs(best_action_value - V[state]))
            V[state] = best_action_value
        if delta < theta:
            break

    policy = {state: np.ones(env.nA) / env.nA for state in env.states}

    for state in env.states:
        A = one_step_lookahead(state, V)
        best_action = np.argmax(A)
        policy[state] = np.eye(env.nA)[best_action]

    return policy, V


def my_formular_vop(env):
    gamma = env.gamma
    g = env.goal
    states = env.states

    my_vop = {}
    for state in states:
        d, k1, k2 = state
        v = 0

        if k2 > 1:
            for i in range(1, k2):
                m = 1
                for j in range(i):
                    m *= (1 - (1/(k2 - j)))
                v += np.power(gamma, i) *\
                    ((-k2 + i + k2*gamma - i*gamma - gamma + g)/((k2 - i)*(1 - gamma)))* m
            my_vop[(d, k1, k2)] = v + (g - 1)/(k2*(1 - gamma)) - 1 + 1/k2

        else:
            assert k2 == 1
            my_vop[(d, k1, k2)] = (g - 1)/(k2*(1 - gamma)) -1 + 1/k2

    return my_vop
#
#
# def reshape_v(v, env):
#     states = env.states
#     nS1 = env.nS1
#     nS2 = env.nS2
#     distance = env.total_distance
#     v_reshape = np.zeros((distance, nS1, nS2))
#     for d in range(1, distance+1):
#         for k1 in range(1, nS1 + 1):
#             for k2 in range(1, nS2 + 1):
#                 v_reshape[d-1, k1-1, k2-1] = v[(d, k1, k2)]
#     return v_reshape


def plot_comparison_vop_dp(env, my_vop, optimal_V, states, total_distance):
    fig, axs = plt.subplots()
    y1 = []
    y2 = []
    y3 = []
    for state in states:
        d, k1, k2 = state
        if d == total_distance and k1 == 1:
            action_values = one_step_lookahead(state, optimal_V, env)
            # print(f"optimal_v at state{d, k1, k2}: {optimal_V[(d, k1, k2)]}")
            print(f"action_values at state {d, k1, k2}: {action_values}")
            # print(f"vop at state{d, k1, k2}: {Vop[(d, k1, k2)]}")
            print(f"my_vop at state {d, k1, k2}: {my_vop[(d, k1, k2)]}")
            print("\n")
            y1.append(optimal_V[state])
            y2.append(action_values[1])
            y3.append(my_vop[state])
    assert len(y2) == len(y3)
    axs.scatter(y2, y3, label="action values of k2", alpha=0.5)
    axs.set_xlabel(f"action states value DP:(d={d}, k1={k1}, k2=(1, ... 26))")
    axs.set_ylabel(f"new VOP state value : (d={d}, k1={k1}, k2=(1, ... 26))")
    plt.title("comparison of vop and optimal state value from DP")
    plt.legend(loc="upper left")
    plt.show()


def roll_out(current_state, env, initial_state, policy, time_steps, crash_at, survival_at):
    actions = env.actions
    gamma = env.gamma
    cumulative_return = 0
    cumulative_return_list = []
    stepwise_return = []
    action_list = []

    for i in range(time_steps):
        action = int(np.argmax(policy[current_state]))
        action_list.append(action)
        # action = 1
        # print(f"actions taken for current state {current_state}: {action}")
        next_states = env.step(current_state, actions[action])
        # values_list returns (state prob, reward, next state)
        values_list = []

        # returns for the next step np, values contains state prob and reward
        for ns, values in next_states.items():
            # print(f"ns: {ns}, values: {values}")
            for value in values:
                values_list.append((value, ns))

        reward_list = [v[1] for v, _ in values_list]
        state_prob_list = [v[0] for v, _ in values_list]
        next_state_list = [next_state for _, next_state in values_list]

        # print(f"value_list: {values_list}")
        # print(f"reward_list: {reward_list}")
        # print(f"state_prob_list: {state_prob_list}")
        # print(f"next_state_list: {next_state_list}")

        assert len(reward_list) == len(values_list) == len(state_prob_list) == len(next_state_list)

        idx = np.random.choice(len(values_list), p=state_prob_list)
        chosen_reward = values_list[idx][0][1]
        stepwise_return.append(chosen_reward)
        cumulative_return += chosen_reward
        cumulative_return_list.append(cumulative_return)

        # print(f"chosen reward: {chosen_reward}")
        next_state = values_list[idx][1]

        # for cr, ns in zip(reward_list, next_state_list):
        #     if cr == chosen_reward:
        #         next_state = ns
        # print(f"next_state: {next_state}")

        if current_state == initial_state:
            current_state = next_state
            survival_at.append(i)
        else:
            crash = np.random.choice([True, False], p=[1 - gamma, gamma])
            if crash:
                crash_at.append(i)
                break
            else:
                current_state = next_state
                survival_at.append(i)

    return cumulative_return_list, stepwise_return, action_list


def simulation(env, policies, time_steps, participant_num):
    # simulation
    initial_state = (env.total_distance, env.nS1, env.nS2)
    current_state = initial_state
    fig, axs = plt.subplots(2, 2)
    best_scores = {}

    for policy_name, policy in policies.items():

        crash_at = []
        survival_at = []

        stepwise_return_arr = np.zeros((participant_num, time_steps))
        # save cumulative return of all participants in numpy array
        cumulative_return_arr = np.zeros((participant_num, time_steps))

        for j in range(participant_num):
            cumulative_return_list, stepwise_return, action_list = roll_out(current_state, env,
                                                                            initial_state, policy,
                                                                            time_steps, crash_at,
                                                                            survival_at)

            stepwise_return_arr[j, :len(stepwise_return)] = stepwise_return
            cumulative_return_arr[j, :len(cumulative_return_list)] = cumulative_return_list
            cumulative_return_arr[j, len(cumulative_return_list):] = cumulative_return_list[-1]

        # get the best 10 scores from the cumulative returns every time step
        cra = cumulative_return_arr.copy()
        cra[::-1, :].sort(axis=0)
        cra_copy = cra[:10, :].tolist()

        # save the 10 best scores of all policies in a dictionary
        best_scores[policy_name] = cra_copy
        # print(f"number of crashes with policy {policy_name}: {len(crash_at)}")
        x = np.arange(time_steps)

        axs[0, 0].scatter(x, np.median(stepwise_return_arr, axis=0), label=policy_name, alpha=0.5)
        axs[0, 0].fill_between(x, np.percentile(stepwise_return_arr, 25, axis=0),
                               np.percentile(stepwise_return_arr, 75, axis=0), alpha=0.2)
        axs[0, 0].set_title("median of stepwise returns")

        axs[0, 1].plot(np.median(cumulative_return_arr, axis=0), label=policy_name)
        axs[0, 1].set_title("median of cumulative returns")
        axs[0, 1].fill_between(x, np.percentile(cumulative_return_arr, 25, axis=0),
                               np.percentile(cumulative_return_arr, 75, axis=0), alpha=0.2)

        axs[1, 0].hist(crash_at, alpha=0.5, rwidth=0.92, label=policy_name)
        axs[1, 0].set_title("crash at")
        axs[1, 1].hist(survival_at, alpha=0.5, rwidth=0.92, label=policy_name)
        axs[1, 1].set_title("survival at")

    plt.legend()
    plt.tight_layout()
    plt.show()
    with open('best_score_list.json', 'w') as fp:
        json.dump(best_scores, fp)


def plot_gamma_skill_values(policy_only_skill_1, policy_only_skill_2):
    V1_initial = []
    V2_initial = []
    for gamma in np.linspace(0.1, 0.9, 9):
        env = Environment(gamma)
        V1 = policy_evaluation(policy_only_skill_1, env)
        V2 = policy_evaluation(policy_only_skill_2, env)
        V1_initial.append(V1[(env.total_distance, env.nS1, env.nS2)])
        V2_initial.append(V2[(env.total_distance, env.nS1, env.nS2)])
    fig, ax = plt.subplots()
    ax.plot(V1_initial, label="skill 1")
    ax.plot(V2_initial, label="skill 2")
    ax.set_xlabel("$\gamma$")
    ax.set_ylabel("State value at d=10")
    ax.set_title("Value of learning for $\gamma = [0.1..0.9]$")
    ax.set_xticklabels([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9])
    plt.legend()
    plt.show()


def main():
    gamma = 0.94
    env = Environment(gamma)

    actions = env.actions
    states = env.states

    optimal_policy, optimal_V = policy_iteration(env)
    policy_only_skill_1 = {state: np.array([1, 0]) for state in states}
    policy_only_skill_2 = {state: np.array([0, 1]) for state in states}

    # print(f"optimal policy: {optimal_policy}")

    policies = {"optimal_policy": optimal_policy,
                "policy_only_skill_1": policy_only_skill_1,
                "policy_only_skill_2": policy_only_skill_2}

    my_vop = my_formular_vop(env)

    Z = np.zeros((10, 10))
    k1 = env.nS1
    k2 = env.nS2

    fig, ax = plt.subplots()

    for i, gamma in enumerate(np.linspace(0.05, 0.95, 10)):
        env = Environment(gamma)

        V1 = policy_evaluation(policy_only_skill_1, env)
        V2 = policy_evaluation(policy_only_skill_2, env)

        for j, d in enumerate(reversed(range(1, 11))):
            Z[i, j] = V1[(d, k1, k2)] - V2[(d, k1, k2)]

    plt.imshow(Z)
    plt.xlabel("Distance")
    # ax.set_xticklabels(list(reversed(range(1, 11))))
    plt.ylabel("Gamma")
    # ax.set_ytickslabels(np.linspace(0.05, 0.95, 10))
    plt.colorbar()
    plt.show()

    plot_gamma_skill_values(policy_only_skill_1, policy_only_skill_2)

    # plot_comparison_vop_dp(env, my_vop, optimal_V, states, total_distance)

    simulation(env, policies, time_steps=10, participant_num=1000)


if __name__ == '__main__':
    main()
