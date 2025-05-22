# at
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
T& at(const key_type& x);              // (1) C++11
const T& at(const key_type & x) const; // (2) C++11

template<class K>
T& at(const K& x);                     // (3) C++26
template<class K>
const T& at(const K& x) const;         // (4) C++26
```

## 概要
指定したキーを持つ要素を取得する。  
[`operator[]`](op_at.md)と違って、要素を取り出す際にキーに対応する値がなければ例外が送出される。

- (1), (2) : クラスのテンプレートパラメータ`key_type`型のキーに対応する要素を取得する
- (3), (4) : `key_type`と比較可能な`K`型のキーに対応する要素を取得する


## テンプレートパラメータ制約
- (3), (4) : `key_compare::is_transparent` が妥当な式であること


## 事前条件
- (3), (4) : [`find`](find.md)`(x)`が妥当な式であり、定義された動作をすること


## 戻り値
キー`x`に対応する値を返す。


## 計算量
要素数に対して対数時間


## 例外
- 指定されたキーに対応する要素が存在しない場合、[`std::out_of_range`](/reference/stdexcept.md)例外を送出する


## 備考
- (3), (4) :
    - `is_transparent`は、標準ライブラリの[`std::less`](/reference/functional/less.md)、[`std::greater`](/reference/functional/greater.md)といった関数オブジェクトの、`void`に対する特殊化で定義される。それ以外のテンプレートパラメータで`is_transparent`が定義されないのは、互換性のためである。
    - これらのオーバーロードは、`map<string, int>`のようなコンテナに対し、検索操作で文字列リテラルを渡した際に、キー型の一時オブジェクトが生成されるコストを減らすためにある。


## 例
```cpp example
#include <iostream>
#include <map>
#include <stdexcept>

template<class Container, class T>
void at_wrap(Container& c, T v)
{
  try {
    std::cout << c.at(v) << std::endl;
  }
  catch(std::out_of_range&) {
    std::cout << "exception std::out_of_range" << std::endl;
  }
}

int main()
{
  std::map<int,char> m;
  m.insert(std::make_pair(1, 'a'));

  at_wrap(m, 1);
  at_wrap(m, 2);

  return 0;
}
```
* c.at[color ff0000]
* m.insert[link insert.md]
* std::out_of_range[link /reference/stdexcept.md]

### 出力
```
a
exception std::out_of_range
```

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]


## 関連項目

| 名前 | 説明 |
|------------------------------------------------|-----------------------|
| [`operator=`](op_assign.md) | 代入演算子 |
| [`insert`](insert.md) | 要素を挿入する |


## 参照
- [LWG Issue 464. Suggestion for new member functions in standard containers](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#464)
- [P2363R5 Extending associative containers with the remaining heterogeneous overloads](http://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2363r5.html)
    - C++26で`template <class K>`のバージョンが追加された
