# ref
* functional[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  reference_wrapper<T> ref(T& t) noexcept;                   // (1) C++11

  template <class T>
  constexpr reference_wrapper<T> ref(T& t) noexcept;         // (1) C++20

  template <class T>
  reference_wrapper<T> ref(reference_wrapper<T> t) noexcept; // (2) C++11

  template <class T>
  constexpr reference_wrapper<T> ref(reference_wrapper<T> t) noexcept; // (2) C++20

  template <class T>
  void ref(const T&&) = delete;                              // (3)
}
```
* reference_wrapper[link reference_wrapper.md]

## 概要
変数への参照`t`を保持する`reference_wrapper`オブジェクトを生成する

C++20からは、テンプレートパラメーター`T`は不完全型をサポートしている。

## 戻り値
- (1) : `t`を参照する`reference_wrapper<T>`オブジェクトを返す。
- (2) : `t`をそのまま返す。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <functional>

int main()
{
  int x = 3;

  // 参照ラッパーrは、変数xへの参照を保持する
  std::reference_wrapper<int> r = std::ref(x);
  ++x;

  std::cout << r.get() << std::endl;
}
```
* std::ref[color ff0000]
* std::reference_wrapper[link reference_wrapper.md]
* r.get()[link reference_wrapper/get.md]

### 出力
```
4
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0357R3 reference_wrapper for incomplete types](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0357r3.html)
    - テンプレートパラメータ`T`に不完全型が許可された経緯
- [P1065R2 constexpr INVOKE](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1065r2.html)