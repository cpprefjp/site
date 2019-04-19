# count
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
size_type count(const key_type& x) const;              // (1) C++11
size_type count(const key_type& x, size_t hash) const; // (2) C++20

template <class K>
size_type count(const K& k) const;                     // (3) C++20
template <class K>
size_type count(const K& k, size_t hash) const;        // (4) C++20
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
キーを検索し、コンテナ内に見つかった要素の数を返す。`map` コンテナはキーの重複を許さないため、この関数は実際には要素が見つかったときに 1 を、そうでないときに 0 を返す。

- (1) : キー`x`を検索し、合致する要素数を取得する
- (2) : キー`x`を、事前計算したハッシュ値をつけて検索し、合致する要素数を取得する
- (3) : キー`k`を透過的に検索し、合致する要素数を取得する
- (4) : キー`k`を、事前計算したハッシュ値をつけて透過的に検索し、合致する要素数を取得する

(3)と(4)の透過的な検索は、`Hash::transparent_key_equal`が定義される場合に有効になる機能であり、例として`unordered_map<string, int> m;`に対して`m.count("key");`のように`string`型のキーを持つ連想コンテナの検索インタフェースに文字列リテラルを渡した際、`string`の一時オブジェクトが作られないようにできる。詳細は[`std::hash`](/reference/functional/hash.md)クラスのページを参照。


## パラメータ
- `x` : 検索するキー値。`key_type` はメンバ型であり、`map` コンテナの中で `Key` の別名として定義される。ここで `Key` は 1 番目のテンプレートパラメータである。
- `k` : 検索するキー。`key_type`と透過的に比較可能な型`K`型のキーである。


## 事前条件
- (2) : 値`hash`と、[`hash_function()`](hash_function.md)`(x)`の戻り値が等値であること
- (4) : 値`hash`と、[`hash_function()`](hash_function.md)`(k)`の戻り値が等値であること


## 戻り値
指定されたキーと同じ値のキーの要素が見つかったなら 1、そうでないなら 0を返す。

メンバ型 `size_type` は符号なし整数型である。


## 例外
投げない。


## 計算量
- 平均： O(`count(k)`)
- 最悪： [`size`](size.md) について線形時間


## 備考
- (3), (4) : このオーバーロードは、`Hash::transparent_key_equal`型が定義される場合にのみ、オーバーロード解決に参加する
- (2), (4) : これらのオーバーロードは、キーに対するハッシュ値を事前に計算しておくことで、何度も同じキーで検索する場合に高速になる


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_map<int, char> um;
  um[4] = 'D';

  std::cout << um.count(0) << std::endl;
  std::cout << um.count(4) << std::endl;

  return 0;
}
```
* count[color ff0000]
* um[4][link op_at.md]

#### 出力
```
0
1
```

### 事前計算しておいたハッシュ値を使用する (C++20)
```cpp example
#include <iostream>
#include <unordered_map>
#include <string>

int main()
{
  std::unordered_map<std::string, int> um = {
    {"Alice", 3},
    {"Bob", 1},
    {"Carol", 4},
  };

  // ハッシュ値を事前計算
  const char* key = "Alice";
  std::size_t hash = um.hash_function()(key);

  // 事前計算しておいたハッシュ値を、検索インタフェースにキーといっしょに渡すことで、
  // 内部でのハッシュ値計算を省略できる
  if (um.count(key, hash) > 0) {
    auto it = um.find(key, hash);
    std::cout << it->first << ':' << it->second << std::endl;
  }
}
```
* count[color ff0000]
* um.hash_function()[link hash_function.md]
* um.find[link find.md]

#### 出力
```
Alice:3
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012


## 関連項目

| 名前              | 説明                     |
|-------------------|--------------------------|
| [`find`](find.md) | 指定したキーで要素を探す |
| [`size`](size.md) | 要素数を取得する         |


## 参照
- [LWG Issue 2304. Complexity of `count` in unordered associative containers](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2304)
- [P0919R3 Heterogeneous lookup for unordered containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0919r3.html)
- [P0920R2 Precalculated hash values in lookup](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0920r2.html)
