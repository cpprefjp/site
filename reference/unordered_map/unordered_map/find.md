# find
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
iterator       find(const key_type& x);                    // (1) C++11
const_iterator find(const key_type& x) const;              // (2) C++11

template <class K> iterator       find(const K& k);        // (3) C++20
template <class K> const_iterator find(const K& k) const;  // (4) C++20
```

## 概要
コンテナ内で指定されたキーに合致する要素を検索し、見つかった場合はそれへのイテレータを返し、見つからなかった場合は [`end`](end.md) （コンテナの最後の要素の次）を指すイテレータを返す。

- (1) : 非`const`な`*this`オブジェクトに対する検索
- (2) : `const`な`*this`オブジェクトに対する検索
- (3) : 非`const`な`*this`オブジェクトに対する透過的な検索
- (4) : `const`な`*this`オブジェクトに対する透過的な検索

(3), (4)の透過的な検索は、`Pred::is_transparent`および`Hash::is_transparent`型が定義される場合に有効になる機能であり、例として`unordered_map<string, int> m;`に対して`m.find("key");`のように`string`型のキーを持つ連想コンテナの検索インタフェースに文字列リテラルを渡した際、`string`の一時オブジェクトが作られないようにできる。詳細は[`std::hash`](/reference/functional/hash.md)クラスのページを参照。


## パラメータ
- `x` : 検索するキー。`key_type` は `unordered_map` コンテナの中で `Key` の別名として定義される。ここで `Key` は 1 番目のテンプレートパラメータである。
- `k` : 検索するキー。`key_type`と透過的に比較可能な型`K`型のキーである。


## テンプレートパラメータ制約
- (3), (4) : `Pred::is_transparent`型および`Hash::is_transparent`型が定義されていること


## 戻り値
指定した値が見つかった場合はその要素へのイテレータ、そうでない場合は [`end`](end.md) へのイテレータ。


## 例外
投げない。


## 計算量
- 平均： 定数時間
- 最悪： [`size`](size.md) について線形時間


## 例
```cpp example
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_map<int, char> um;

  um.insert(std::make_pair(1,'a'));

  std::cout << (um.find(1) != um.end()) << std::endl;
  std::cout << (um.find(2) != um.end()) << std::endl;

  return 0;
}
```
* find[color ff0000]
* um.insert[link insert.md]
* um.end()[link end.md]

### 出力
```
1
0
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

| 名前                | 説明                                   |
|---------------------|----------------------------------------|
| [`count`](count.md) | 指定したキーにマッチする要素の数を返す |


## 参照
- [P0919R3 Heterogeneous lookup for unordered containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0919r3.html)
