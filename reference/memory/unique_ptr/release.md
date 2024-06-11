# release
* memory[meta header]
* std[meta namespace]
* unique_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
pointer release() noexcept;           // (1) C++11
constexpr pointer release() noexcept; // (1) C++23
```

## 概要
リソースの所有権を放棄する。


## 効果
`*this`が保持しているリソースの所有権を放棄する。リソースを解放するのではなく、解放する責任を放棄する。

この関数を呼び出したあと、このクラスのデストラクタでは、現在保持しているリソースを解放しなくなる。


## 事後条件
この関数を呼び出したあと、[`get()`](get.md)メンバ関数は`nullptr`を返す。


## 戻り値
放棄したリソースを返す。


## 例
```cpp example
#include <memory>

int main()
{
  std::unique_ptr<int> p(new int(3));

  // pは、保持しているリソースの所有権を放棄する
  // resource変数が所有権を持つようになる
  int* resource = p.release();

  // 所有権を持つresourceがリソースを解放する
  delete resource;

  // pのデストラクタでは、リソースが解放されない
}
```
* release()[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.4.7 [mark verified]
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]


## 参照
- [P2273R3 Making `std::unique_ptr` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2273r3.pdf)
