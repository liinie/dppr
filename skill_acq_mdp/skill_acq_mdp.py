import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

states = list((x, y) for x in [0, 1] for y in [0, 1])
actions = ["ms", "nms1", "nms2"]  # ms: mastered skills, nms1: not mastered skill 1, nms2: not mastered skill 2

reward_ms = 1
reward_nms1_imediate = 5
reward_nms2_imediate = 5
reward_nms1_determine = 10
reward_nms2_determine = 10
discount_factor = 0.9

pr = False

optimal_state_value = np.array([[14, 10], [10, 0]])
print(optimal_state_value)


def optimal_pseudo_reward(cur_state, action, discount_factor):
    next_state, _ = step(cur_state, actions[action])
    pseudo_reward = discount_factor*optimal_state_value[next_state] - optimal_state_value[cur_state]
    return pseudo_reward


def start_state(state):
    x, y = state
    if x == 0 and y == 0:
        return True


def acquired_first_skill(state):
    x, y = state
    if x == 1 and y == 0:
        return True


def acquired_second_skill(state):
    x, y = state
    if x == 0 and y == 1:
        return True


def is_terminal(state):
    x, y = state
    if x == 1 and y == 1:
        return True


def step(state, action):
    if action == "ms":
        reward = reward_ms
        next_state = state

    elif action == "nms1" and start_state(state):
        reward = reward_nms1_imediate
        next_state = (1, 0)

    elif action == "nms2" and start_state(state):
        reward = reward_nms2_imediate
        next_state = (0, 1)

    elif acquired_first_skill(state):
        reward = reward_nms2_determine
        next_state = (1, 1)

    elif acquired_second_skill(state):
        reward = reward_nms1_determine
        next_state = (1, 1)

    else:
        raise ValueError

    return next_state, reward


def expected_returns(state, action, state_value, pr):
    i, j = state
    new_state_value = state_value.copy()
    (next_i, next_j), reward = step(state, actions[action])
    if pr:
        reward += optimal_pseudo_reward(state, action, discount_factor)
    new_state_value[i, j] = reward + discount_factor*new_state_value[next_i, next_j]
    return new_state_value[i, j]


def policy_evaluation(policy, pr):
    state_value = np.zeros((2, 2))
    new_state_value = state_value.copy()

    iteration = 1

    while True:
        for i in range(len(states)):

            if is_terminal(states[i]):
                continue

            new_state_value[states[i]] = 0

            for action, action_prob in enumerate(policy[i]):
                (next_i, next_j), reward = step(states[i], actions[action])
                if pr:
                    reward += optimal_pseudo_reward(states[i], action, discount_factor)
                new_state_value[states[i]] += action_prob * (reward + discount_factor*state_value[next_i, next_j])
        print(f"new state value: {new_state_value}")
        print(f"state value: {state_value}")
        value_change = np.sum(np.abs(state_value - new_state_value))
        print("value_change in: {}".format(value_change))
        if value_change < 1e-10:
            state_value = new_state_value.copy()
            break

        state_value = new_state_value.copy()
        iteration += 1

    return state_value


def policy_iteration():
    # initial random policy
    policy = np.zeros((len(states), len(actions)))

    for i in range(len(states)):

        if start_state(states[i]):
            for action, act_prob in enumerate(policy[i]):
                policy[i][action] = 1 / 3
        if states[i] == (1, 0):
            policy[i][0] = 1 / 2
            policy[i][2] = 1 / 2
        if states[i] == (0, 1):
            policy[i][0] = 1 / 2
            policy[i][1] = 1 / 2

    while True:

        policy_stable = True

        state_value = policy_evaluation(policy, pr)

        policy_change_count = 0
        for i in range(len(states)):
            if is_terminal(states[i]):
                continue
            chosen_a = np.argmax(policy[i])
            action_returns = []
            for action, act_prob in enumerate(policy[i]):
                action_returns.append(act_prob * expected_returns(states[i], action, state_value, pr))
            print(f"action returns {action_returns}")
            best_action = np.argmax(action_returns)
            if best_action != chosen_a:
                print(f"best action: {best_action}, chosen action: {chosen_a} in state {states[i]}")
                policy_change_count += 1
                policy_stable = False
            policy[i] = np.eye(len(actions))[best_action]
        print("policy change in {} states".format(policy_change_count))
        if policy_stable:
            return policy, state_value

#
# def show_fig(data):
#     fig = sns.heatmap(np.flipud(data))
#     plt.show(fig)


if __name__ == '__main__':
    policy, state_value = policy_iteration()
    print(f"optimal policy: {policy}")
    print(f"optimal state value: {state_value}")
    # show_fig(policy)
    # show_fig(state_value)
