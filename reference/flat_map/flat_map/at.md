# at
* flat_map[meta header]
* std[meta namespace]
* flat_map[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
mapped_type& at(const key_type& x);             // (1) C++23

template <class K>
mapped_type& at(const K& x);                    // (2) C++23

const mapped_type& at(const key_type& x) const; // (3) C++23

template <class K>
const mapped_type& at(const K& x) const;        // (4) C++23
```

## 概要
指定したキーを持つ要素を取得する。  
要素を取り出す際にキーの存在チェックをする。

- (1), (3) : クラスのテンプレートパラメータ`key_type`型のキーを受け取る
- (2), (4) : `key_type`と比較可能な`K`型のキーを受け取る


## テンプレートパラメータ制約
- (2), (4) : `key_compare::is_transparent`が妥当な式であること


## 事前条件
- (2), (4) : `find(x)`という式が妥当であり、動作が明確に定義されていること


## 戻り値
キー`x`に対応する値を返す。対応する要素が存在しないときは、[`out_of_range`](/reference/stdexcept.md)例外を投げる。


## 計算量
要素数に対して対数時間


## 備考
- (2), (4) :
    - `is_transparent`は、標準ライブラリの[`std::less`](/reference/functional/less.md)、[`std::greater`](/reference/functional/greater.md)といった関数オブジェクトの、`void`に対する特殊化で定義される。それ以外のテンプレートパラメータで`is_transparent`が定義されないのは、互換性のためである。
    - これらのオーバーロードは、`flat_map<string, int>`のようなコンテナに対し、検索操作で文字列リテラルを渡した際に、キー型の一時オブジェクトが生成されるコストを減らすためにある。


## 例
```cpp example
#include <iostream>
#include <flat_map>
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
  std::flat_map<int,char> fm;
  fm.insert(std::make_pair(1, 'a'));

  at_wrap(fm, 1);
  at_wrap(fm, 2);
}
```
* c.at[color ff0000]
* fm.insert[link insert.md]
* std::out_of_range[link /reference/stdexcept.md]

### 出力
```
a
exception std::out_of_range
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`operator[]`](op_at.md)
- [`find()`](find.md)
