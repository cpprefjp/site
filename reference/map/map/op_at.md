# operator[]
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]

```cpp
T& operator[](const key_type& x); // (1) C++03

T& operator[](key_type&& x);      // (2) C++11

template <class K>
T& operator[](K&& x);             // (3) C++26
```

## 概要
指定したキーを持つ要素を取得する。対応する要素が存在しない場合は生成して返す。

- (1), (2) : クラスのテンプレートパラメータ`key_type`型のキーに対応する要素を取得する
- (3) : `key_type`と比較可能な`K`型のキーに対応する要素を取得する


## テンプレートパラメータ制約
- (3) : `key_compare::is_transparent` が妥当な式であること


## 戻り値
キー`x`に対応する値を返す。対応する要素が存在しない場合は、要素を値初期化して参照を返す。


## 計算量
要素数に対して対数時間


## 備考
- (3) :
    - `is_transparent`は、標準ライブラリの[`std::less`](/reference/functional/less.md)、[`std::greater`](/reference/functional/greater.md)といった関数オブジェクトの、`void`に対する特殊化で定義される。それ以外のテンプレートパラメータで`is_transparent`が定義されないのは、互換性のためである。
    - これらのオーバーロードは、`map<string, int>`のようなコンテナに対し、検索操作で文字列リテラルを渡した際に、キー型の一時オブジェクトが生成されるコストを減らすためにある。


## 例
```cpp example
#include <iostream>
#include <map>

int main()
{
  std::map<int, char> m;
  m.insert(std::make_pair(1, 'a'));

  // キー`1`に対応する要素を参照する
  char& a = m[1];
  std::cout << a << std::endl;

  // キー`2`に対応する要素を生成する
  m[2] = 'b';
}
```
* m[1][color ff0000]
* m[2][color ff0000]
* m.insert[link insert.md]

### 出力
```
a
```

## 関連項目

| 名前 | 説明 |
|------------------------------------------------|-----------------------|
| [`operator=`](op_assign.md) | 代入演算子 |
| [`insert`](insert.md) | 要素を挿入する |


## 参照
- [P2363R5 Extending associative containers with the remaining heterogeneous overloads](http://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2363r5.html)
    - C++26で`template <class K>`のバージョンが追加された
