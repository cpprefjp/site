# do_is_equal
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* memory_resource[meta class]
* cpp17[meta cpp]

```cpp
virtual bool do_is_equal(const memory_resource& other) const noexcept = 0;
```

## 概要
今のオブジェクト（`this`）で確保（[`allocate`](allocate.md)）したメモリ領域が、`other`によって解放（[`deallocate`](deallocate.md)）でき、その逆も可能かをチェックする。

## 引数
- `other` -- チェックする`memory_resource`オブジェクト

## 戻り値
`this->allocate()`で確保したメモリ領域を`other.deallocate()`で問題なく解放でき、その逆も可能な場合に`true`を返す。

`this`と`other`の指すオブジェクトは必ずしも同じ型ではない可能性があるので、実装では`dynamic_cast`によって`this`と`other`の指すオブジェクトの型が一致することをチェックし、さもなければ直ちに`false`を返す必要がある。

つまり、ある`memory_resource`の実装（派生クラス）`D`はこの関数実装内で最初に`dynamic_cast<const D*>(&other) == nullptr`をチェックし、結果が`true`ならば直ちに`false`を返すようにする必要がある。

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6 [mark verified]

## 関連項目
- [`is_equal`](is_equal.md)
