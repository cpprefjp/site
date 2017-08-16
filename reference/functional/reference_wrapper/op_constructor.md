# コンストラクタ
* functional[meta header]
* std[meta namespace]
* reference_wrapper[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
reference_wrapper(T& t) noexcept;                       // (1)
reference_wrapper(T&&) = delete;                        // (2)
reference_wrapper(const reference_wrapper& x) noexcept; // (3)
```

## 概要
与えられた参照で、参照オブジェクトを構築する。

- (1) : `t`への参照を保持する`reference_wrapper`オブジェクトを構築する
- (2) : 右辺値参照は受け取れない
- (3) : `x.`[`get()`](/reference/functional/reference_wrapper/get.md)への参照を保持する`reference_wrapper`オブジェクトを構築する



## 例
```cpp
#include <iostream>
#include <functional>

int main()
{
  int x = 3;

  // (1)
  // xへの参照を保持する
  std::reference_wrapper<int> r(x);
  r.get() += 1;
  std::cout << x << std::endl;

  // (2)
  // 参照ラッパーrが指すxへの参照を保持する
  std::reference_wrapper<int> r2(r);
  r2.get() += 1;
  std::cout << x << std::endl;
}
```
* r.get()[link get.md]

### 出力
```
4
5
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


