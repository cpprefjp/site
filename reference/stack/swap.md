#swap (C++11)
* stack[meta header]
* std[meta namespace]
* stack[meta class]
* function[meta id-type]

```cpp
void swap(stack& s) noexcept(noexcept(swap(c, s.c)));
```

##概要
他の `stack` オブジェクトと値を入れ替える。


##効果
`swap(c, s.c)`


##戻り値
なし


##例外
`swap(c, s.c)` が例外を投げない場合、この関数は決して例外を投げない。


##例
```cpp
#include <iostream>
#include <stack>

int main ()
{
  std::stack<int> st0;
  st0.push(3);
  st0.push(1);
  st0.push(4);

  std::stack<int> st1;
  st1.push(2);
  st1.push(7);
  st1.push(1);

  // 交換
  st0.swap(st1);

  // それぞれの要素を表示
  std::cout << "st0 : ";
  while (!st0.empty()) {
    std::cout << st0.top() << " ";
    st0.pop();
  }

  std::cout << std::endl;

  std::cout << "st1 : ";
  while (!st1.empty()) {
    std::cout << st1.top() << " ";
    st1.pop();
  }
}
```

###出力
```
st0 : 1 7 2 
st1 : 4 1 3 
```

##実装例
```cpp
void swap(stack& s) noexcept(noexcept(swap(c, s.c)))
{
  using std::swap;
  swap(c, s.c);
}
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


##参照


