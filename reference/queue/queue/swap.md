#swap
```cpp
void swap(queue& q) noexcept(noexcept(swap(c, q.c)))
```

##概要
他の`queue`オブジェクトと値を入れ替える。


##効果
`swap(c, q.c)`


##戻り値
なし


##例外
`swap(c, q.c)` が例外を投げない場合、この関数は決して例外を投げない。


##例
```cpp
#include <iostream>
#include <queue>

template <class Queue>
void pop_print(Queue& que)
{
  while (!que.empty()) {
    std::cout << que.front() << " ";
    que.pop();
  }
  std::cout << std::endl;
}

int main ()
{
  std::queue<int> x;
  x.push(1);
  x.push(2);
  x.push(3);

  std::queue<int> y;
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
4 5 6 
1 2 3 
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md)


##参照

