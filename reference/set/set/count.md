# count
* set[meta header]
* std[meta namespace]
* set[meta class]
* function[meta id-type]

```cpp
size_type count(const key_type& x) const; // (1)

template <class K>
size_type count(const K& x) const;        // (2) C++14
```

## 概要
キー `x` を検索し、コンテナ内に見つかった要素の数を返す。`set` コンテナはキーの重複を許さないため、この関数は実際には要素が見つかったときに 1 を、そうでないときに 0 を返す。`multiset`コンテナの場合はキーの重複を許すため、`x`と等値なキーの要素数を返す。

- (1) : クラスのテンプレートパラメータ`key_type`型のキーを受け取って、`x`と等価なキーを持つ要素の数を取得する。
- (2) : `key_type`と比較可能な`K`型のキーを受け取って、`x`と等価なキーを持つ要素の数を取得する。


## 戻り値
- (1) : `x`と等価なキーの要素が見つかった場合は1、そうでない場合は0を返す。
- (2) : `key_compare`型の関数オブジェクトを`c`、コンテナ内の各要素が持つキーを`k`として、キーが等価か判定する式`!c(k, x) && !c(x, k)`が`true`となる要素が見つかった場合は1、そうでない場合は0を返す。


## 計算量
[`size()`](size.md) について対数時間


## 備考
- (2) : この関数がオーバーロード解決に参加する条件は、[`find()`](find.md)メンバ関数の備考欄を参照。


## 例
```cpp
#include <iostream>
#include <set>
#include <string>

int main()
{
  // (1)
  {
    std::multiset<std::string> s = { "Alice", "Bob", "Bob", "Carol" };

    std::size_t n = s.count("Bob");
    std::cout << n << std::endl;
  }

  // (2)
  {
    std::multiset<std::string, std::less<>> s = { "Alice", "Bob", "Bob", "Carol" };

    // std::lessのvoidに対する特殊化を使用することで、
    // 文字列リテラルをcount()関数の引数として渡した際に、
    // std::string型の一時オブジェクトが生成されない。
    std::size_t n = s.count("Bob");
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

| 名前                              | 説明                                                     |
|-----------------------------------|----------------------------------------------------------|
| [`find`](find.md)               | 指定したキーで要素を探す                                 |
| [`size`](size.md)               | 要素数を取得する                                         |
| [`lower_bound`](lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを返す |
| [`upper_bound`](upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す       |


## 参照
- [N3657 Adding heterogeneous comparison lookup to associative containers (rev 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3657.htm)
