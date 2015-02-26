#swap (非メンバ関数) (C++11)
* stack[meta header]

```cpp
namespace std {
  template <class T, class Container>
  void swap(stack<T, Container>& x, stack<T, Container>& y) noexcept(noexcept(x.swap(y)));
}
```

##概要
2つの `stack` オブジェクトを入れ替える。


##効果
`x.`[`swap`](./swap.md)`(y)`


##戻り値
なし


##例外
`x.`[`swap`](./swap.md)`(y)` が例外を投げない場合、この関数は決して例外を投げない。


##例
```cpp
#include <iostream>
#include <stack>

int main ()
{
  std::stack<int>  x;
  x.push(3);
  x.push(1);
  x.push(4);

  std::stack<int>  y;
  y.push(2);
  y.push(7);
  y.push(1);

  // 交換
  std::swap(x, y);

  // それぞれの要素を表示
  std::cout << "x : ";
  while (!x.empty()) {
    std::cout << x.top() << " ";
    x.pop();
  }

  std::cout << std::endl;

  std::cout << "y : ";
  while (!y.empty()) {
    std::cout << y.top() << " ";
    y.pop();
  }

}
```
* swap[color ff0000]

###出力
```
x : 1 7 2 
y : 4 1 3 
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp)

