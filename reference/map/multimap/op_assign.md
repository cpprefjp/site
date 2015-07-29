#operator=
* map[meta header]
* std[meta namespace]
* multimap[meta class]
* function[meta id-type]

```cpp
multimap& operator=(const multimap& x);                 // (1) C++03
multimap& operator=(multimap&& y);                      // (2) C++11
multimap& operator=(initializer_list<value_type> init); // (3) C++11
```

##概要
- (1) : コピー代入
- (2) : ムーブ代入
- (3) : 初期化子リストの代入


##効果
- (1) : 同じテンプレートパラメータを持つ`multimap`クラスのオブジェクトをコピー代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にコピーされる。
- (2) : 同じテンプレートパラメータを持つ`multimap`クラスのオブジェクトをムーブ代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にムーブされる。
- (3) : 同じテンプレートパラメータを持つ`initializer_list`クラスのオブジェクトをコピー代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にコピーされる。


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
#include <map>

int main()
{
  std::pair<int,char> values[] = {
    std::make_pair(5,'e'),
    std::make_pair(2,'b'),
    std::make_pair(4,'d'),
    std::make_pair(1,'a'),
    std::make_pair(1,'a'),
    std::make_pair(3,'c')
  };
  std::multimap<int, char> c1(values, values + 6);
  std::multimap<int, char> c2;

  c2 = c1;
  c1 = std::multimap<int,char>();

  std::cout << "Size of c1: " << c1.size() << std::endl;
  std::cout << "Size of c2: " << c2.size() << std::endl;

  return 0;
}
```

###出力
```
Size of c1: 0
Size of c2: 6
```

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0


##関連項目

| 名前 | 説明 |
|---------------------------------------------------------------------------------------|-----------------------|
| [`insert`](/reference/map/multimap/insert.md) | 要素を挿入する |
| [`multimap`](/reference/map/multimap/op_constructor.md) | コンストラクタ |


##参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (3)の経緯となる提案文書

