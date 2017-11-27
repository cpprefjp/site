# swap (非メンバ関数)
* queue[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, class Container, class Compare>
  void swap(priority_queue<T, Container, Compare>& x,
            priority_queue<T, Container, Compare>& y) noexcept(noexcept(x.swap(y)));
}
```
* swap[link /reference/queue/priority_queue/swap.md]

## 概要
2つの`priority_queue`オブジェクトを入れ替える。


## 効果
`x.`[`swap`](swap.md)`(y);`


## 戻り値
なし


## 例外
`x.`[`swap`](swap.md)`(y)` が例外を投げない場合、この関数は決して例外を投げない。


## 例
```cpp example
#include <iostream>
#include <queue>

template <class PriorityQueue>
void pop_print(PriorityQueue& que)
{
  while (!que.empty()) {
    std::cout << que.top() << " ";
    que.pop();
  }
  std::cout << std::endl;
}

int main()
{
  std::priority_queue<int> x;
  x.push(1);
  x.push(2);
  x.push(3);

  std::priority_queue<int> y;
  y.push(4);
  y.push(5);
  y.push(6);

  std::swap(x, y);

  pop_print(x);
  pop_print(y);
}
```
* std::swap[color ff0000]
* push[link push.md]
* que.empty()[link empty.md]
* que.top()[link top.md]
* que.pop()[link pop.md]

### 出力
```
6 5 4 
3 2 1 
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


## 参照
