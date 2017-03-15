# Callable
* functional[meta header]
* std[meta namespace]
* cpp11[meta cpp]


## 概要
`Callable`は、関数呼び出し可能な型を表す、型の分類、または要件である。ライブラリ機能ではない。


## `Callable`に該当する型

- 関数ポインタ
- 関数オブジェクト
- メンバ関数ポインタ
- メンバ変数ポインタ


## 例
[`std::function`](function.md)クラスは、`Callable`に該当するあらゆる型のオブジェクトを代入できる仕様になっている。

```cpp
#include <cassert>
#include <functional>

int add(int x) { return x + 1; }

struct X {
  int value = 3;

  int add(int x) const
  { return x + 1; }
};

int main()
{
  // 関数を代入
  std::function<int(int)> f1 = add;
  int result1 = f1(1);
  assert(result1 == 2);

  // 関数オブジェクトを代入
  std::function<int(int)> f2 = [](int x) { return x + 1; };
  int result2 = f2(1);
  assert(result2 == 2);

  X x;

  // メンバ関数ポインタを代入
  std::function<int(const X&, int)> f3 = &X::add;
  int result3 = f3(x, 1);
  assert(result3 == 2);

  // メンバ変数ポインタを代入
  std::function<int(const X&)> f4 = &X::value;
  int result4 = f4(x);
  assert(result4 == 3);
}
```
* std::function[link function.md]

### 出力
```
```

