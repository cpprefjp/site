# lower_bound
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]

```cpp
iterator lower_bound(const key_type& x);             // (1)

template <class K>
iterator lower_bound(const K& x);                    // (2) C++14

const_iterator lower_bound(const key_type& x) const; // (3)

template <class K>
const_iterator lower_bound(const K& x) const;        // (4) C++14
```

## 概要
`x` を右辺とする `<` 演算が成り立たない最初の要素を指すイテレータを返す（コンテナの比較オブジェクトが使われる）。すなわちこれは `>=` 演算にあたる。

[`upper_bound()`](/reference/map/map/upper_bound.md) とは異なり、このメンバ関数は `x` より大きいだけでなく、`x` と等しい場合であってもその要素へのイテレータを返す。

内部的には `map` コンテナ内の全ての要素は常に比較オブジェクトが定義する基準に沿って並んでいるため、この関数が返すいずれかの後に続く全ての要素が `x` より大きいか等しいことに注意。

- (1), (3) : `key_type`型のキーを受け取り、そのキーより小さくない最初の要素へのイテレータを取得する。
- (2), (4) : `key_type`と比較可能な`K`型のキーを受け取り、そのキーより小さくない最初の要素へのイテレータを取得する。


## 戻り値
- (1), (3) : コンテナ内で `x` を右辺とする `<` 演算が成り立たない最初の要素へのイテレータを返す。そのような要素がない場合は、[`end()`](end.md)を返す。
- (2), (4) : `key_compare`型の関数オブジェクトを`c`、コンテナ内の各要素が持つキーを`k`として、キーが小さくないか判定する式`!c(k, x)`が`true`となる要素へのイテレータを返す。そのような要素がない場合は、[`end()`](end.md) を返す。


## 計算量
[`size()`](/reference/map/map/size.md) について対数時間。


## 備考
- (2), (4) : この関数がオーバーロード解決に参加する条件は、[`find()`](find.md)メンバ関数の備考欄を参照。


## 例
```cpp example
#include <iostream>
#include <string>
#include <map>

int main()
{
  // (1)
  {
    std::map<std::string, int> m = {
      {"A", 3},
      {"B", 1},
      {"C", 4},
      {"D", 5}
    };

    // B以上D以下の範囲を取得
    decltype(m)::iterator it = m.lower_bound("B");
    decltype(m)::iterator last = m.upper_bound("D");

    while (it != last) {
      std::cout << it->first << ',' << it->second << std::endl;
      ++it;
    }
    std::cout << std::endl;
  }

  // (2)
  {
    std::map<std::string, int, std::less<>> m = {
      {"A", 3},
      {"B", 1},
      {"C", 4},
      {"D", 5}
    };

    // std::lessのvoidに対する特殊化を使用することで、
    // 文字列リテラルをlower_bound()関数の引数として渡した際に、
    // std::string型の一時オブジェクトが生成されない。
    decltype(m)::iterator it = m.lower_bound("B");
    decltype(m)::iterator last = m.upper_bound("D");

    while (it != last) {
      std::cout << it->first << "," << it->second << std::endl;
      ++it;
    }
  }
}
```
* lower_bound[color ff0000]
* m.upper_bound[link upper_bound.md]
* std::less[link /reference/functional/less.md]

### 出力
```
B,1
C,4
D,5

B,1
C,4
D,5
```

## 関連項目

| 名前 | 説明 |
|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| [`upper_bound`](/reference/map/map/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す |
| [`equal_range`](/reference/map/map/equal_range.md) | 指定したキーにマッチする要素範囲を返す |
| [`find`](/reference/map/map/find.md) | 指定したキーで要素を探す |
| [`count`](/reference/map/map/count.md) | 指定したキーにマッチする要素の数を返す |


## 参照
- [N3657 Adding heterogeneous comparison lookup to associative containers (rev 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3657.htm)

