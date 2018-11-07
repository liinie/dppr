import numpy as np
import matplotlib.pyplot as plt
import csv
import pandas as pd


def is_terminal(distance):
    if distance == 0:
        return True


class Environment:

    """ The mdp is for the skill acquisition mdp and with objective level environment of space ship travel.
    The space ship game environment has to be episodic, or else, it makes no sense, because one can't travel away
    from the destination"""

    def __init__(self, gamma):
        self.nS1 = 50
        self.nS2 = 26
        self.goal = 10
        self.gamma = gamma
        self.actions = [1, 2]
        self.total_distance = 10
        self.states = [(d, k1, k2)
                       for d in range(1, self.total_distance + 1)
                       for k1 in range(1, self.nS1 + 1)
                       for k2 in range(1, self.nS2 + 1)]


    def reset_distance(self):
        # return np.random.randint(4, self.total_distance + 1)
        return 10

    # Return the next states given current state
    def step(self, cur_state, action):

        d, k1, k2 = cur_state
        # if reaching the goal, d will be randomly set between [3, total_distance]

        next_states = {}  # key: next_state, values: transition_prob, reward

        # try skill 1
        if action == self.actions[0]:
            # if skill 1 is not acquired
            if k1 > 1:
                # if getting error trying skill 1, the position in the objective mdp does not change
                # and reward = -1
                reward = -1

                next_states[(d, k1 - 1, k2)] = (1 - (1/k1), reward)

                # if getting the skill 1, the player move one step further in obj-mdp, and get reward -1 if
                # he's not reached the goal
                d -= 1
                if d == 0:
                    reward = self.goal - 1
                    # reset the game environment
                    d = self.reset_distance()
                next_states[(d, 1, k2)] = (1/k1, reward)

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
                next_states[(d, 1, k2)] = (1, reward)

        elif action == self.actions[1]:
            # if skill 2 is not acquired
            if k2 > 1:
                # if getting error when trying skill 2, the player would get reward -1
                reward = -1
                next_states[(d, k1, k2 - 1)] = (1 - (1/k2), reward)

                # if getting the right key of skill 2, the player would get reward goal - 1
                # and reaching the destination.
                reward = self.goal - 1
                # reward = 2 * self.goal - 1
                # d will be reset to a random number between 3 and total_distance, game reset
                d = self.reset_distance()
                next_states[(d, k1, 1)] = (1/k2, reward)

            # if skill 2 is already acquired
            else:
                reward = self.goal - 1
                # reward = 2 * self.goal - 1

                # d = 0
                # d will be reset to a random number between 3 and total_distance, game reset
                d = self.reset_distance()
                next_states[(d, k1, 1)] = (1, reward)

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

                for next_state, (state_prob, reward) in next_states.items():
                    # print(f"next state: {next_state}")
                    v += action_prob * state_prob * (reward + gamma * V[next_state])

            delta = max(delta, np.abs(V[state] - v))
            V[state] = v

        iteration += 1

        if delta < 1e-4:
            break
    return V


def one_step_lookahead(state, V, env):
    # print(f"state: {state}")
    gamma = env.gamma
    actions = env.actions
    A = np.zeros(len(actions))

    for action in range(len(A)):
        next_states = env.step(state, actions[action])
        for next_state, (state_prob, reward) in next_states.items():
            A[action] += state_prob * (reward + gamma * V[next_state])

    return A


def policy_iteration(env):

    actions = env.actions
    states = env.states

    policy = {state: np.ones(len(actions))/len(actions) for state in states}
    action_values = {}

    while True:

        V = policy_evaluation(policy, env)

        policy_stable = True
        policy_change = 0

        for state in states:
            d, k1, k2 = state

            chosen_a = np.argmax(policy[(d, k1, k2)])
            action_values[(d, k1, k2)] = one_step_lookahead((d, k1, k2), V, env)
            # print(f"action_values at state{d, k1, k2}: {action_values[state]}")
            best_action = np.argmax(action_values)
            if best_action != chosen_a:
                policy_change += 1
                policy_stable = False
            policy[state] = np.eye(len(actions))[best_action]
        print("policy change in {} states".format(policy_change))

        if policy_stable:
            return policy, V, action_values


def analytical_state_value(env):
    states = env.states
    V = {}
    gamma = env.gamma
    g = env.goal
    for state in states:
        d, k1, k2 = state
        # if d == 0:
        #     continue
        V[state] = max(((g / (1 - gamma)) - (k2 + 1) * (g - 1) / 2),
                       (g * np.floor(1 / ((1 - gamma) * d)) - (1 / (1 - gamma))))
        if d == 1 and k1 == 1:
            print(f"analytical_state_value at state ({state}): {((g / (1 - gamma)) - (k2 + 1) * (g - 1) / 2)}, "
                  f"{(g * np.floor(1 / ((1 - gamma) * d)) - (1 / (1 - gamma)))}")

    return V


def VoP(analyt_opt_v, env):
    VoP = {}
    # states = env.states
    gamma = env.gamma
    g = env.goal
    distance = env.total_distance
    nS2 = env.nS2
    nS1 = env.nS1
    states = [(d, k1, k2) for d in range(1, distance + 1) for k1 in range(1, nS1 + 1) for k2 in range(1, nS2 + 1)]

    for state in states:
        d, k1, k2 = state
        if k2 > 1:
            v = 1/k2 * (g - 1 + gamma * analyt_opt_v[d, k1, 1]) + \
                (1 - 1/k2) * (-1 + gamma * analyt_opt_v[d, k1, (k2 - 1)])
            # VoP[state] = v - (g * np.floor(1 / ((1 - gamma) * distance)) - (1 / (1 - gamma)))
            VoP[state] = v

        else:
            assert k2 == 1
            v = 1/k2 * (g - 1 + gamma * analyt_opt_v[d, k1, 1])
            VoP[state] = v
    return VoP


def my_formular_vop(env):
    nS2 = env.nS2
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
                    ((-k2 + i + 1 + k2*gamma - i*gamma - gamma + g - 1)/((k2 - i)*(1 - gamma)))* m
            my_vop[(d, k1, k2)] = v + (g - 1)/(k2*(1 - gamma)) - 1

        else:
            assert k2 == 1
            my_vop[(d, k1, k2)] = (g - 1)/(k2*(1 - gamma)) - 1

    return my_vop


def reshape_v(v, env):
    states = env.states
    nS1 = env.nS1
    nS2 = env.nS2
    distance = env.total_distance
    v_reshape = np.zeros((distance, nS1, nS2))
    for d in range(1, distance+1):
        for k1 in range(1, nS1 + 1):
            for k2 in range(1, nS2 + 1):
                v_reshape[d-1, k1-1, k2-1] = v[(d, k1, k2)]
    return v_reshape


def main():
    env = Environment(0.94)
    actions = env.actions
    states = env.states
    gamma = env.gamma
    distance = env.total_distance
    nS2 = env.nS2
    nS1 = env.nS1


    # optimal_policy, optimal_V, action_values = policy_iteration(env)

    # optimal_V_reshape = reshape_v(optimal_V, env)
    # print(f"optimal v reshape: {optimal_V_reshape}")

    #plot optimal_V
    with open("optimal_v_dict.csv", "w") as csv_file:
        writer = csv.writer(csv_file)
        gamma_space = np.linspace(0.99, 0.99, 1, endpoint=True)
        for gamma in gamma_space:
            env = Environment(gamma)
            optimal_policy, optimal_V, action_values = policy_iteration(env)
            # # print vop, my_vop, optimal value
            analytical_optimal_V = analytical_state_value(env)
            Vop = VoP(analytical_optimal_V, env)
            my_vop = my_formular_vop(env)


            fig, axs = plt.subplots()

            y1 = []
            y2 = []
            y3 = []
            y4 = []

            for state in states:
                d, k1, k2 = state
                if d == 1 and k1 == 1:
                    # print(f"optimal_v at state{d, k1, k2}: {optimal_V[(d, k1, k2)]}")
                    print(f"action_values at state {d, k1, k2}: {action_values[(d, k1, k2)]}")
                    print(f"vop at state{d, k1, k2}: {Vop[(d, k1, k2)]}")
                    # print(f"my_vop at state {d, k1, k2}: {my_vop[(d, k1, k2)]}")
                    print("\n")

                    y1.append(optimal_V[state])
                    y2.append(action_values[state][1])
                    y3.append(my_vop[state])
                    y4.append(Vop[state])

            # x = [i for i in range(len(y1))]
            # axs.scatter(x, y1, label="optimal V", alpha=0.7)
            # axs.scatter(x, y2, label="vop", alpha=0.7)
            # axs.scatter(x, y3, label="my_vop", alpha=0.5)
            # axs.scatter(x, y4, label="action values of k2", alpha=0.5)
            assert len(y2) == len(y4)
            axs.scatter(y2, y4, label="action values of k2", alpha=0.5)
            axs.set_xlabel("action states value DP:(d=1, k1=1, k2=(1, ... 26))")
            axs.set_ylabel("VOP state value : (d=1, k1=1, k2=(1, ... 26))")
            plt.title("comparison of vop and opitmal state value from DP")
            plt.legend()
            plt.show()
            # writer.writerow(["gamma", "distance", "k1", "k2", "value"])
            # for (d, k1, k2), value in optimal_V.items():
            #         writer.writerow([float(gamma), int(d), int(k1), int(k2), float(value)])

    # df = pd.read_csv("optimal_v_dict.csv")
    # plt.figure()
    # pd.plotting.parallel_coordinates(df[['gamma', 'distance', 'k2', 'value']], "value")
    # pd.plotting.parallel_coordinates(df[['gamma', 'distance', 'k1', 'value']], k1)
    # plt.show()


if __name__ == '__main__':
    main()
