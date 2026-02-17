# count
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
size_type count(const key_type& x) const;           // (1) C++11
constexpr size_type count(const key_type& x) const; // (1) C++26

template <class K>
size_type count(const K& k) const;           // (2) C++20
template <class K>
constexpr size_type count(const K& k) const; // (2) C++26
```

## 概要
キーを検索し、コンテナ内に見つかった要素の数を返す。`unordered_map` コンテナはキーの重複を許さないため、この関数は実際には要素が見つかったときに 1 を、そうでないときに 0 を返す。

- (1) : キー`x`を検索し、合致する要素数を取得する
- (2) : キー`k`を透過的に検索し、合致する要素数を取得する

(2)の透過的な検索は、`Pred::is_transparent`および`Hash::is_transparent`が定義される場合に有効になる機能であり、例として`unordered_map<string, int> m;`に対して`m.count("key");`のように`string`型のキーを持つ連想コンテナの検索インタフェースに文字列リテラルを渡した際、`string`の一時オブジェクトが作られないようにできる。詳細は[`std::hash`](/reference/functional/hash.md)クラスのページを参照。


## パラメータ
- `x` : 検索するキー値。`key_type` はメンバ型であり、`unordered_map` コンテナの中で `Key` の別名として定義される。ここで `Key` は 1 番目のテンプレートパラメータである。
- `k` : 検索するキー。`key_type`と透過的に比較可能な型`K`型のキーである。


## テンプレートパラメータ制約
- (2) : `Pred::is_transparent`型および`Hash::is_transparent`型が定義されていること


## 戻り値
指定されたキーと同じ値のキーの要素が見つかったなら 1、そうでないなら 0を返す。

メンバ型 `size_type` は符号なし整数型である。


## 例外
投げない。


## 計算量
`x`と`k`を共通の変数`a`であるとして、

- 平均： O(`count(a)`)
- 最悪： [`size`](size.md) について線形時間


## 例
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

### 出力
```
0
1
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]


## 関連項目

| 名前              | 説明                     |
|-------------------|--------------------------|
| [`find`](find.md) | 指定したキーで要素を探す |
| [`size`](size.md) | 要素数を取得する         |


## 参照
- [LWG Issue 2304. Complexity of `count` in unordered associative containers](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2304)
- [P0919R3 Heterogeneous lookup for unordered containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0919r3.html)
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
