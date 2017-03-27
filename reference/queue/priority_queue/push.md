# push
* queue[meta header]
* std[meta namespace]
* priority_queue[meta class]
* function[meta id-type]

```cpp
void push(const value_type& x); // (1)
void push(value_type&& x);      // (2) C++11
```

## 概要
新たな要素を追加し、優先順に並べ替えを行う。


## 効果
- (1) :

    ```cpp
    c.push_back(x);
    push_heap(c.begin(), c.end(), comp);
    ```
    * push_heap[link /reference/algorithm/push_heap.md]


- (2) :

    ```cpp
    c.push_back(move(x));
    push_heap(c.begin(), c.end(), comp);
    ```
    * move[link /reference/utility/move.md]
    * push_heap[link /reference/algorithm/push_heap.md]


## 戻り値
なし


## 例
```cpp
#include <iostream>
#include <queue>

int main()
{
  std::priority_queue<int> que;

  que.push(3);
  que.push(1);
  que.push(4);

  while (!que.empty()) {
    const int& x = que.top();
    std::cout << x << std::endl;
    que.pop();
  }
}
```
* push[color ff0000]
* que.empty()[link empty.md]
* que.pop()[link pop.md]

### 出力
```
4
3
1
```

### 右辺値参照バージョンの使用可能状況
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


## 参照


