# pointer_safety
* memory[meta header]
* std[meta namespace]
* enum[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  enum class pointer_safety {
    relaxed,
    preferred,
    strict
  };
}
```

## 概要
`pointer_safety`は、ポインタ安全性について、その挙動／規則について確認するための列挙型である。


## Safety-Derived なポインタ
"Safety-Derived なポインタ" とは、とても簡単に言うと, `::operator new` で確保されたオブジェクトを指しているポインタのことである。これは、トリッ�ーな実装により得られたポインタと区別するために用いられる。ガベージコレクション ABI では、Safety-Derived なポインタであるかどうかを基準として動作する。

## 列挙値

各列挙値の説明を以下に示す.

| 列挙値 | 説明 | 対応バージョン |
|-------------|-----------------------------------------------------------------------------------------|-------|
| `relaxed`   | Safety-Derived なポインタもそうでないポインタも同様に扱われる。 (C++03 までと同じ)      | C++11 |
| `preferred` | `relaxed`と同様。ただしリークに関するレポート(ヒント)を実装することを許可する。         | C++11 |
| `strict`    | この環境では厳密な実装が行われており、Safety-Derived と 非Safety-Derived は区別される。 | C++11 |


## バージョン
### 言語
- C++11

### 環境
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013

## 参照
- [C++0x ガベージコレクションと到達可能性ベースリーク検知の最小支援 - Faith and Brave - C++で遊ぼう](http://faithandbrave.hateblo.jp/entry/20081117/1226913980)
* [N2670: Minimal Support for Garbage Collection and Reachability-Based Leak Detection (revised)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2670.htm)
- [Garbage Collection ABI - C++ FAQ - www.stroustrup.com](http://www.stroustrup.com/C++11FAQ.html#gc-abi)

