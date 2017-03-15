# count
* map[meta header]
* std[meta namespace]
* multimap[meta class]
* function[meta id-type]

```cpp
size_type count(const key_type& x) const; // (1)

template <class K>
size_type count(const K& x) const;        // (2) C++14
```

## 概要
キー `x` を検索し、コンテナ内に見つかった要素の数を返す。

- (1) : クラスのテンプレートパラメータ`key_type`型のキーを受け取って、`x`と等価なキーを持つ要素の数を取得する。
- (2) : `key_type`と比較可能な`K`型のキーを受け取って、`x`と等価なキーを持つ要素の数を取得する。


## 戻り値
- (1) : `x`と等価なキーの要素数を返す。
- (2) : `key_compare`型の関数オブジェクトを`c`、コンテナ内の各要素が持つキーを`k`として、キーが等価か判定する式`!c(k, x) && !c(x, k)`が`true`となる要素の数を返す。


## 計算量
[`size()`](/reference/map/multimap/size.md) について対数時間


## 例
```cpp
#include <iostream>
#include <map>
#include <string>

int main()
{
  // (1)
  {
    std::multimap<std::string, int> m = {
      {"Alice", 3},
      {"Bob",   1},
      {"Carol", 4},
      {"Bob",   5}
    };

    std::size_t n = m.count("Bob");
    std::cout << n << std::endl;
  }

  // (2)
  {
    std::multimap<std::string, int, std::less<>> m = {
      {"Alice", 3},
      {"Bob",   1},
      {"Carol", 4},
      {"Bob",   5}
    };

    // std::lessのvoidに対する特殊化を使用することで、
    // 文字列リテラルをcount()関数の引数として渡した際に、
    // std::string型の一時オブジェクトが生成されない。
    std::size_t n = m.count("Bob");
    std::cout << n << std::endl;
  }
}
```
* count[color ff0000]
* std::less[link /reference/functional/less.md]

### 出力
```
2
2
```

## 関連項目

| 名前 | 説明 |
|-------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| [`multimap::find`](/reference/map/multimap/find.md) | 指定したキーで要素を探す |
| [`multimap::size`](/reference/map/multimap/size.md) | 要素数を取得する |
| [`multimap::lower_bound`](/reference/map/multimap/lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを返す |
| [`multimap::upper_bound`](/reference/map/multimap/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す |


## 参照
- [N3657 Adding heterogeneous comparison lookup to associative containers (rev 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3657.htm)

