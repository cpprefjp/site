#find
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]

```cpp
iterator find(const key_type& x);             // (1)
const_iterator find(const key_type& x) const; // (2)

template <class K>
iterator find(const K& x);                    // (3) C++14

template <class K>
const_iterator find(const K& x) const;        // (4) C++14
```

##概要
`x`と等価なキーの要素を検索する。

- (1), (2) : クラスのテンプレートパラメータ`key_type`型のキーを受け取って検索する。
- (3), (4) : `key_type`と比較可能な`K`型のキーを受け取って検索する。


##戻り値
- (1), (2) : `x`と等価なキーの要素が見つかった場合は、見つかった要素へのイテレータを返す。そうでない場合は、 [`end()`](/reference/map/map/end.md) を返す。
- (3), (4) : `key_compare`型の関数オブジェクトを`c`、コンテナ内の各要素が持つキーを`k`として、キーが等価か判定する式`!c(k, x) && !c(x, k)`が`true`となる要素へのイテレータを返す。そのような要素がない場合は、[`end()`](/reference/map/map/end.md) を返す。


##計算量
[`size`](/reference/map/map/size.md) について対数時間。


##備考
- (3), (4) : `key_compare::is_transparent`が妥当な式である場合のみ、この関数はオーバーロード解決に参加する。
    - `is_transparent`は、標準ライブラリの[`std::less`](/reference/functional/less.md)、[`std::greater`](/reference/functional/greater.md)といった関数オブジェクトの、`void`に対する特殊化で定義される。それ以外のテンプレートパラメータで`is_transparent`が定義されないのは、互換性のためである。
    - これらのオーバーロードは、`map<string, int>`のようなコンテナに対し、検索操作で文字列リテラルを渡した際に、キー型の一時オブジェクトが生成されるコストを減らすためにある。


##例
```cpp
#include <iostream>
#include <map>
#include <string>

int main()
{
  // (1)
  {
    std::map<std::string, int> m = {
      {"Alice", 3},
      {"Bob",   1},
      {"Carol", 4}
    };
  
    decltype(m)::iterator it = m.find("Bob");
    if (it != m.end()) { // 見つかった
      std::cout << it->second << std::endl;
    }
  }

  // (3)
  {
    std::map<std::string, int, std::less<>> m = {
      {"Alice", 3},
      {"Bob",   1},
      {"Carol", 4}
    };

    // std::lessのvoidに対する特殊化を使用することで、
    // 文字列リテラルをfind()関数の引数として渡した際に、
    // std::string型の一時オブジェクトが生成されない。
    decltype(m)::iterator it = m.find("Bob");
    if (it != m.end()) { // 見つかった
      std::cout << it->second << std::endl;
    }
  }
}
```
* find[color ff0000]
* std::string[link /reference/string/basic_string.md]
* std::less[link /reference/functional/less.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
1
1
```

##関連項目

| 名前 | 説明|
|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| [`map::count`](/reference/map/map/count.md) | 指定したキーにマッチする要素の数を返す |
| [`map::lower_bound`](/reference/map/map/lower_bound.md) | 与えられた値より小さくない要素へのイテレータを返す |
| [`map::upper_bound`](/reference/map/map/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す |


##参照
- [N3657 Adding heterogeneous comparison lookup to associative containers (rev 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3657.htm)

