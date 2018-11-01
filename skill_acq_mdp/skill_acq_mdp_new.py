import numpy as np
from tqdm import tqdm


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
        self.gamma = 0.0
        self.actions = [1, 2]
        self.total_distance = 10
        self.states = [(d, k1, k2) for d in range(self.total_distance + 1) for k1 in range(1, self.nS1 + 1) for k2 in range(1, self.nS2 + 1)]

    # Return the next states given current state
    def step(self, cur_state, action):
        assert action in self.actions
        d, k1, k2 = cur_state
        assert (d >= 0, k1 >= 1, k2 >= 1), "value out of range"
        reward = 0

        next_states = {}  # key: next_state, values: transition_prob, reward, distance, done

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
                next_states[(d, 1, k2)] = (1/k1, reward)

            # if skill 1 is acquired
            else:
                d -= 1
                if d == 0:
                    reward = self.goal - 1

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
                d = 0
                reward = self.goal - 1
                next_states[(d, k1, 1)] = (1/k2, reward)

            # if skill 2 is already acquired
            else:
                reward = self.goal - 1
                d = 0

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

            if d == 0:
                continue

            v = 0

            for action, action_prob in enumerate(policy[state]):

                next_states = env.step(state, actions[action])

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
            if d == 0:
                continue

            chosen_a = np.argmax(policy[state])
            action_values = one_step_lookahead(state, V, env)
            #             print("action_values: {}".format(action_values))
            best_action = np.argmax(action_values)
            if best_action != chosen_a:
                policy_change += 1
                policy_stable = False
            policy[state] = np.eye(len(actions))[best_action]
        print("policy change in {} states".format(policy_change))

        if policy_stable:
            return policy, V

def main():
    env = Environment()
    actions = env.actions
    states = env.states

    optimal_policy = {}
    policy, V = policy_iteration(env)
    for (d, k1, k2), values in policy.items():
        if d > 0:
            optimal_policy[(d, k1, k2)] = values
    print(optimal_policy)
    print(V)


if __name__ == '__main__':
    main()
