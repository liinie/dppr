import numpy as np
import matplotlib.pyplot as plt


def is_terminal(distance):
    if distance == 0:
        return True


class Environment:

    """ The mdp is for the skill acquisition mdp and with objective level environment of space ship travel.
    The space ship game environment has to be episodic, or else, it makes no sense, because one can't travel away
    from the destination"""

    def __init__(self):
        self.nS1 = 3
        self.nS2 = 4
        self.goal = 10
        self.gamma = 0.1
        self.actions = [1, 2]
        self.total_distance = 10
        self.states = [(d, k1, k2)
                       for d in range(1, self.total_distance + 1)
                       for k1 in range(1, self.nS1 + 1)
                       for k2 in range(1, self.nS2 + 1)]

    def reset_distance(self):
        return np.random.randint(4, self.total_distance + 1)

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
                # d = 0
                reward = self.goal - 1
                # d will be reset to a random number between 3 and total_distance, game reset
                d = self.reset_distance()
                next_states[(d, k1, 1)] = (1/k2, reward)

            # if skill 2 is already acquired
            else:
                reward = self.goal - 1
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

    while True:

        V = policy_evaluation(policy, env)

        policy_stable = True
        policy_change = 0

        for state in states:
            d, k1, k2 = state

            chosen_a = np.argmax(policy[(d, k1, k2)])
            action_values = one_step_lookahead((d, k1, k2), V, env)
            # print("action_values: {}".format(action_values))
            best_action = np.argmax(action_values)
            if best_action != chosen_a:
                policy_change += 1
                policy_stable = False
            policy[state] = np.eye(len(actions))[best_action]
        print("policy change in {} states".format(policy_change))

        if policy_stable:
            return policy, V


def analytical_state_value(env):
    total_distance = env.total_distance
    nS1 = env.nS1
    nS2 = env.nS2
    states = [(d, k1, k2) for d in range(1, total_distance + 1) for k1 in range(1, nS1 + 1) for k2 in range(1, nS2 + 1)]
    V = {}
    gamma = env.gamma
    g = env.goal
    # states = [(d, k2) for d in range(1, total_distance + 1) for k2 in range(1, nS2 + 1)]
    for state in states:
        d, k1, k2 = state
        if d == 0:
            continue
        V[state] = max(((g / (1 - gamma)) - (k2 + 2) * (g - 1) / 2),
                       (g * np.floor(1 / ((1 - gamma) * d)) - (1 / (1 - gamma))))

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
            v = 1/k2 * (g - 1 + gamma * analyt_opt_v[d, k1, 1]) + (1 - 1/k2) * (-1 + gamma * analyt_opt_v[d, k1, (k2 - 1)])
            VoP[state] = v - (g * np.floor(1 / ((1 - gamma) * distance)) - (1 / (1 - gamma)))
            # VoP[state] = v
        else:
            assert k2 == 1
            v = 1/k2 * (g - 1 + gamma * analyt_opt_v[d, k1, 1])
            VoP[state] = v
    return VoP


def my_formular_vop(env):
    nS2 = env.nS2
    # k2 = [i for i in range(nS2 + 1)]
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
                v += np.power(gamma, i)*\
                    ((-k2 + i + 1 + k2*gamma - i*gamma - gamma + g - 1)/((k2 - i)*(1 - gamma)))* m
            my_vop[(d, k1, k2)] = v + (g - 1)/(k2*(1 - gamma)) - 1
        else:
            assert k2 == 1
            my_vop[(d, k1, k2)] = (g - 1)/(k2*(1 - gamma)) - 1

    return my_vop



def main():
    env = Environment()
    actions = env.actions
    states = env.states
    gamma = env.gamma
    distance = env.total_distance
    nS2 = env.nS2

    optimal_policy = {}
    optimal_V = {}
    policy, V = policy_iteration(env)
    for (d, k1, k2), values in policy.items():
        optimal_policy[(d, k1, k2)] = values
        optimal_V[(d, k1, k2)] = V[(d, k1, k2)]

    analytical_optimal_V = analytical_state_value(env)
    Vop = VoP(analytical_optimal_V, env)
    my_vop = my_formular_vop(env)

    # difference = {}
    # for state in states:
    #     d, k1, k2 = state
    #     if d == 0:
    #         continue
    #     difference[state] = optimal_V[state] - analytical_optimal_V[state]
    # print(f"difference between analysis and dynamic programming V: {difference}")

    # states = [(d, k2) for d in range(1, distance + 1) for k2 in range(1, nS2 + 1)]

    for state in states:

        d, k1, k2 = state
        # print(f"k2:{k2}")

        print(f"my vop: {k2}:{my_vop[state]}")
        print(f"VoP: {state}:{Vop[state]}")
        # print(f"analytical optiaml value at {state}: {analytical_optimal_V[state]}")

        print(f"V: {state}: {optimal_V[state]}")

    fig, axs = plt.subplots()

    y1 = []
    y2 = []
    y3 = []
    for state in states:
        d, k1, k2 = state

        y1.append(optimal_V[state])
        y2.append(Vop[state])
        y3.append(my_vop[state])
    x = [i for i in range(len(y1))]
    axs.plot(x, y1, label="optiaml V")
    axs.plot(x, y2, label="vop")
    axs.plot(x, y3, label="my_vop")
    plt.legend()
    plt.show()


if __name__ == '__main__':
    main()
