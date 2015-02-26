#operator=
* set[meta header]
* std[meta namespace]
* set[meta class]
* function[meta id-type]

```cpp
set& operator=(const set& x);                      // (1) C++03
set& operator=(set&& x);                           // (2) C++11
set& operator=(initializer_list<value_type> init); // (3) C++11
```
*initializer_list[link ../../initializer_list.md]

##概要
- (1) : コピー代入
- (2) : ムーブ代入
- (3) : 初期化子リストの代入


##効果
- (1) : 同じテンプレートパラメータを持つ `set` クラスのオブジェクトをコピー代入する。`*this` の全ての要素が解放され、`x` の全ての要素が `*this` にコピーされる。
- (2) : 同じテンプレートパラメータを持つ `set` クラスのオブジェクトをムーブ代入する。`*this` の全ての要素が解放され、`x` の全ての要素が `*this` にムーブされる。
- (3) : 同じテンプレートパラメータを持つ `initializer_list` クラスのオブジェクトをコピー代入する。`*this` の全ての要素が解放され、`x` の全ての要素が `*this` にコピーされる。


##戻り値
`*this`


##事後条件
- (1) : `*this == x`
- (2) : `*this`は元々の`x`と等値となる
- (3) : `*this == x`


##計算量
- (1) : 全要素のデストラクタ呼び出しとコピーを行うために、線形時間
- (2) : 全要素のデストラクタ呼び出しをするために、線形時間
- (3) : 全要素のデストラクタ呼び出しとコピーを行うために、線形時間


##例
```cpp
#include <iostream>
#include <set>

int main()
{
  int values[] = { 5, 2, 4, 1, 0, 0, 9 };
  std::set<int> c1(values, values + 7);
  std::set<int> c2;

  c2 = c1;
  c1 = std::set<int>();

  std::cout << "Size of c1: " << c1.size() << std::endl;
  std::cout << "Size of c2: " << c2.size() << std::endl;
}
```
* iostream[link ../../iostream.md]
* set[link ../../set.md]
* cout[link ../../iostream/cout.md]
* endl[link ../../ostream/endl.md]
* size[link size.md]
* =[color ff0000]

###出力
```
Size of c1: 0
Size of c2: 6
```

##参照

| 名前                         | 説明           |
|------------------------------|----------------|
| [`insert`](./insert.md)      | 要素を挿入する |
| [`set`](./op_constructor.md) | コンストラクタ |
