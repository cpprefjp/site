# operator=
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
optional<T>& operator=(nullopt_t) noexcept;              // (1)

optional& operator=(const optional& rhs);                // (2)
optional& operator=(optional&& rhs) noexcept(see below); // (3)

template <class U = T>
optional& operator=(U&& rhs);                            // (4)

template <class U>
optional& operator=(const optional<U>& rhs);             // (5)

template <class U>
optional& operator=(optional<U>&& rhs);                  // (6)
```
* nullopt_t[link /reference/optional/nullopt_t.md]

## 概要
- (1) : 無効値を代入する
- (2) : コピー代入
- (3) : ムーブ代入
- (4) : 要素型`T`に変換可能な値をムーブ代入
- (5) : `optional<T>`に変換可能な`optional`オブジェクトをコピー代入
- (6) : `optional<T>`に変換可能な`optional`オブジェクトをムーブ代入


## 効果
まず、共通の動作として、[`reset()`](reset.md)メンバ関数を呼び出す

- (2) : `rhs`が有効な値を含んでいれば、`rhs.`[`value()`(value.md)を有効値として`*this`にコピー代入する
- (3) : `rhs`が有効な値を含んでいれば、`rhs.`[`value()`(value.md)を有効値として`*this`にムーブ代入する
- (4) : `rhs`を有効値として`*this`にムーブ代入する
- (5) : `rhs`が有効な値を含んでいれば、`rhs.`[`value()`(value.md)を有効値として`*this`にコピー代入する
- (6) : `rhs`が有効な値を含んでいれば、`rhs.`[`value()`(value.md)を有効値として`*this`にムーブ代入する


## 戻り値
`*this`


## 例外
- (3) : 要素型`T`が、ムーブ代入とムーブ構築で例外を送出しない場合、この関数は決して例外を送出しない


## 例外安全性
共通の動作として、代入演算子内で例外が発生した場合、[`has_value()`](has_value.md)の結果は変わらない。

- (2) : 型`T`のコピーコンストラクタで例外が発生した場合は、なにも効果がなく終了する。型`T`のコピー代入で例外が発生した場合は、型`T`のコピー代入演算子の例外安全性が保証する動作となる
- (3) : 型`T`のムーブコンストラクタで例外が発生した場合、`*rhs.val`の状態は型`T`のムーブコンストラクタの例外安全性によって決定される
- (4), (5), (6) : 型`T`のコンストラクタもしくは代入演算子で例外が発生した場合、それらの関数の例外安全性が保証する動作となる


## 備考
- (2) : 型`T`がコピー構築可能でなく、コピー代入可能でもない場合、この関数は削除定義される
- (3) : 型`T`がムーブ構築可能でなく、ムーブ代入可能でもない場合、この関数は削除定義される
- (4), (5), (6) : 型`U`が型`T`に変換可能でない場合、この関数はオーバーロード解決の候補から除外される



## 例
```cpp
#include <cassert>
#include <optional>
#include <utility>

int main()
{
  // (1)
  // 無効値を代入
  {
    std::optional<int> p = 3;

    p = std::nullopt;
    assert(!p.has_value());
  }

  // (2)
  // コピー代入
  {
    std::optional<int> a = 3;
    std::optional<int> b = 1;

    a = b;
    assert(a.value() == 1);
  }

  // (3)
  // ムーブ代入
  {
    std::optional<int> a = 3;
    std::optional<int> b = 1;

    a = std::move(b);
    assert(a.value() == 1);
  }

  // (4)
  // 有効値をコピー代入もしくはムーブ代入
  {
    std::optional<int> p;

    p = 3;
    assert(p.has_value());
    assert(p.value() == 3);
  }

  // (5)
  // 変換可能なoptionalオブジェクトをコピー代入
  {
    std::optional<long long> a = 3LL;
    std::optional<int> b = 1;

    a = b;
    assert(a.value() == 1LL);
  }

  // (6)
  // 変換可能なoptionalオブジェクトをムーブ代入
  {
    std::optional<long long> a = 3LL;
    std::optional<int> b = 1;

    a = std::move(b);
    assert(a.value() == 1LL);
  }
}
```
* std::nullopt[link /reference/optional/nullopt_t.md]
* std::move[link /reference/utility/move.md]
* p.has_value()[link has_value.md]
* p.value()[link value.md]
* a.value()[link value.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [GCC, C++17 mode](/implementation.md#gcc): 7.2
- [Clang, C++17 mode](/implementation.md#clang): 4.0.1
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 2756. `optional<T>` should `forward` `T`'s implicit conversions](https://wg21.cmeerw.net/lwg/issue2756)
