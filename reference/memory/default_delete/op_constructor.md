# コンストラクタ
* memory[meta header]
* std[meta namespace]
* default_delete[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
// 単一オブジェクト版
constexpr default_delete() noexcept = default;                     // (1) C++11

template <class U>
default_delete(const default_delete<U>& other) noexcept;           // (2) C++11
template <class U>
constexpr default_delete(const default_delete<U>& other) noexcept; // (2) C++23

// 配列版 (default_delete<T[]>)
constexpr default_delete() noexcept = default;                       // (3) C++11

template <class U>
default_delete(const default_delete<U[]>& other) noexcept;           // (4) C++17
template <class U>
constexpr default_delete(const default_delete<U[]>& other) noexcept; // (4) C++23
```

## 概要
`default_delete`オブジェクトを構築する。

- (1), (3) : デフォルトコンストラクタ
- (2), (4) : 変換可能な型の`default_delete`オブジェクトから構築する


## テンプレートパラメータ制約
- (2) : `U*`が`T*`に暗黙変換可能であること
- (4) : `U(*)[]`が`T(*)[]`に変換可能であること

いずれも、満たさない場合はオーバーロード解決に参加しない。


## 効果
- (1), (3) : 何もしない
- (2), (4) : `other`から`default_delete`オブジェクトを構築する


## 例外
投げない


## 備考
- (1), (3) : `= default`で定義されるため、トリビアルなデフォルトコンストラクタである。
- (4) : 配列版の変換コンストラクタは、C++17で追加された。それ以前は、`default_delete<Derived[]>`から`default_delete<Base[]>`のような変換ができなかった。


## 例
```cpp example
#include <memory>

struct Base {};
struct Derived : Base {};

int main()
{
  // (1) デフォルト構築
  std::default_delete<Derived> d1;

  // (2) 変換可能な型からの構築
  // Derived*はBase*に暗黙変換可能
  std::default_delete<Base> d2 = d1;

  // (3) 配列版のデフォルト構築
  std::default_delete<int[]> d3;

  // (4) 配列版の変換可能な型からの構築
  // const修飾を付加する変換は可能
  std::default_delete<int[]> d4;
  std::default_delete<const int[]> d5 = d4;

  Derived* p = new Derived();
  d2(p);
}
```
* std::default_delete[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++11


## 関連項目
- [`default_delete::operator()`](op_call.md)
- [`unique_ptr`](../unique_ptr.md)


## 参照
- [LWG Issue 854. `default_delete` converting constructor underspecified](https://cplusplus.github.io/LWG/issue854)
    - C++11で、(2)が`U*`から`T*`へ暗黙変換可能な場合にのみオーバーロード解決に参加することが規定された
- [LWG Issue 1517. `default_delete`'s default constructor should be trivial](https://cplusplus.github.io/LWG/issue1517)
    - C++11で、デフォルトコンストラクタが`= default`で定義されるようになり、トリビアルになった
- [N4089 Safe conversions in `unique_ptr<T[]>`, revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4089.pdf)
    - C++17で、配列版に変換コンストラクタ(4)が追加された
- [P2273R3 Making `std::unique_ptr` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2273r3.pdf)
    - C++23で、コンストラクタが`constexpr`対応した
