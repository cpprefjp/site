# デストラクタ
* span[meta header]
* std[meta namespace]
* span[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
~span() noexcept = default; // (1) C++20
~span() = default;          // (1) C++26
```

## 概要
`span`オブジェクトを破棄する。

`span`は要素列を所有しない（非所有の）ビューであるため、このデストラクタは参照先の要素に対しては何もしない。トリビアルにデフォルト定義される。


## 例外
投げない


## バージョン
### 言語
- C++20


## 参照
- [P0122R7 `<span>`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0122r7.pdf)
- [LWG Issue 3903. `span` destructor is redundantly `noexcept`](https://cplusplus.github.io/LWG/issue3903)
    - C++26で、デストラクタの冗長な`noexcept`指定が削除された（暗黙に`noexcept`であるため）
