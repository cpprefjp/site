#swap (C++11)
```cpp
void swap(priority_queue& q)
          noexcept(noexcept(swap(c, q.c)) && noexcept(swap(comp, q.comp)))
```

##概要
他の`priority_queue`オブジェクトと値を入れ替える。


##効果
`using std::swap;` 
`swap(c, q.c);` 
`swap(comp, q.comp);` 


##戻り値
なし


##例外
`swap(c, q.c)` および `swap(comp, q.comp)` が例外を投げない場合、この関数は決して例外を投げない。


##例
```cpp
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

int main ()
{
  std::priority_queue<int> x;
  x.push(1);
  x.push(2);
  x.push(3);

  std::priority_queue<int> y;
  y.push(4);
  y.push(5);
  y.push(6);

  x.swap(y);

  pop_print(x);
  pop_print(y);
}
```
* swap[color ff0000]

###出力
```
6 5 4 
3 2 1 
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


