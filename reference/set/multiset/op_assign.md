# operator=
* set[meta header]
* std[meta namespace]
* multiset[meta class]
* function[meta id-type]

```cpp
multiset& operator=(const multiset& x);                      // (1) C++03
multiset& operator=(multiset&& x);                           // (2) C++11
multiset& operator=(multiset&& x)
  noexcept(allocator_traits<Allocator>::is_always_equal::value
            && is_nothrow_move_assignable<Compare>::value);  // (2) C++17
multiset& operator=(initializer_list<value_type> init);      // (3) C++11
```
*initializer_list[link ../../initializer_list.md]

## 概要
- (1) : コピー代入
- (2) : ムーブ代入
- (3) : 初期化�リストの代入


## 効果
- (1) : 同じテンプレートパラメータを持つ `multiset` クラスのオブジェクトをコピー代入する。`*this` の全ての要素が解放され、`x` の全ての要素が `*this` にコピーされる。
- (2) : 同じテンプレートパラメータを持つ `multiset` クラスのオブジェクトをムーブ代入する。`*this` の全ての要素が解放され、`x` の全ての要素が `*this` にムーブされる。
- (3) : 同じテンプレートパラメータを持つ `initializer_list` クラスのオブジェクトをコピー代入する。`*this` の全ての要素が解放され、`x` の全ての要素が `*this` にコピーされる。


## 戻り値
`*this`


## 事後条件
- (1) : `*this == x`
- (2) : `*this`は元々の`x`と�値となる
- (3) : `*this == x`


## 計算量
- (1) : 全要素のデストラクタ呼び出しとコピーを行うために、線形時間
- (2) : 全要素のデストラクタ呼び出しをするために、線形時間
- (3) : 全要素のデストラクタ呼び出しとコピーを行うために、線形時間


## 例
```cpp example
#include <iostream>
#include <set>

int main()
{
  int values[] = { 5, 2, 4, 1, 0, 0, 9 };
  std::multiset<int> c1(values, values + 7);
  std::multiset<int> c2;

  c2 = c1;
  c1 = std::multiset<int>();

  std::cout << "Size of c1: " << c1.size() << std::endl;
  std::cout << "Size of c2: " << c2.size() << std::endl;
}
```
* =[color ff0000]
* size()[link size.md]

### 出力
```
Size of c1: 0
Size of c2: 7
```


## 関連項目

| 名前                         | 説明           |
|------------------------------|----------------|
| [`insert`](insert.md)      | 要素を挿入する |
| [`set`](op_constructor.md) | コンストラクタ |


## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
- [N4258 Cleaning-up noexcept in the Library, Rev 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4258.pdf)
    - `noexcept` 追加の経緯となる提案文書
