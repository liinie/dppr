import numpy as np
import matplotlib.pyplot as plt


class Environment:
    def __init__(self):
        self.board = np.zeros((6, 6))
        self.finite_state = self.start_state = self.cur_state = None

    def board_reset(self):
        self.board = np.zeros((6, 6))
        self.cur_state = self.start_state

    def get_cur_board(self):
        return self.board

    def set_cur_state(self, cur_state):
        self.cur_state = cur_state

    def get_cur_state(self):
        if self.cur_state is None:
            return self.start_state
        else:
            return self.cur_state

    def env_update(self, cur_state):
        self.board[cur_state[0], cur_state[1]] = 1
        return self.board

    def done(self, cur_state):
        if cur_state == np.array(self.finite_state).tolist():
            return True

    def show_board(self):
        plt.imshow(self.board)
        plt.show()


class EnvironmentTutorial(Environment):

    def __init__(self):
        super().__init__()
        self.finite_state = (2, 3)
        self.start_state = (5, 1)
        self.board[self.finite_state] = 2
        self.board[self.start_state] = 1

    def board_reset(self):
        super(EnvironmentTutorial, self).board_reset()
        self.finite_state = (2, 3)
        self.start_state = (5, 1)
        self.board[self.finite_state] = 2
        self.board[self.start_state] = 1

    def step(self, cur_state, action):
        next_state = (np.array(cur_state) + np.array(action)).tolist()
        if next_state[0] < 0 or next_state[0] > (self.board.shape[0] - 1) or next_state[1] < 0 or next_state[1] > \
                (self.board.shape[1] - 1):
            next_state = cur_state
        return next_state


class EnvironmentGame(Environment):
    def __init__(self):
        super().__init__()
        self.finite_state = (0, 5)
        self.start_state = (5, 1)
        self.board[self.finite_state] = 2
        self.board[self.start_state] = 1

    def board_reset(self):
        super(EnvironmentGame, self).board_reset()
        self.finite_state = (0, 5)
        self.start_state = (5, 1)
        self.board[self.finite_state] = 2
        self.board[self.start_state] = 1

    def step(self, cur_state, action):
        if action == "teleportation":
            next_state = [self.finite_state[0], self.finite_state[1]]
        else:
            # print(cur_state)
            next_state = (np.array(cur_state) + np.array(action)).tolist()
            if next_state[0] < 0 or next_state[0] > (self.board.shape[0] - 1) or next_state[1] < 0 or next_state[1] > \
                    (self.board.shape[1] - 1):
                next_state = cur_state

        return next_state





