# swap
* stack[meta header]
* std[meta namespace]
* stack[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void swap(stack& s) noexcept(noexcept(swap(c, s.c)));
```

## 概要
他の `stack` オブジェクトと値を入れ替える。


## 効果
`swap(c, s.c)`


## 戻り値
なし


## 例外
`swap(c, s.c)` が例外を投げない場合、この関数は決して例外を投げない。


## 例
```cpp example
#include <iostream>
#include <stack>

int main()
{
  std::stack<int> x;
  x.push(3);
  x.push(1);
  x.push(4);

  std::stack<int> y;
  y.push(2);
  y.push(7);
  y.push(1);

  // 交換
  x.swap(y);

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
* push[link push.md]
* empty()[link empty.md]
* top()[link top.md]
* pop()[link pop.md]

### 出力
```
x : 1 7 2 
y : 4 1 3 
```

## 実装例
```cpp
void swap(stack& s) noexcept(noexcept(swap(c, s.c)))
{
  using std::swap;
  swap(c, s.c);
}
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp)


## 参照


