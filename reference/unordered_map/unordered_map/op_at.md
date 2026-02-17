# operator[]
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
T& operator[](const key_type& x);           // (1) C++11
constexpr T& operator[](const key_type& x); // (1) C++26

T& operator[](key_type&& x);           // (2) C++11
constexpr T& operator[](key_type&& x); // (2) C++26

template <class K>
constexpr T& operator[](K&& k); // (3) C++26
```

## 概要
要素へのアクセス。

- (1), (2) : クラスのテンプレートパラメータ`key_type`型のキーに対応する要素を取得する
- (3) : `key_type`と比較可能な`K`型のキーに対応する要素を取得する


## テンプレートパラメータ制約
- (3) : `key_compare::is_transparent` が妥当な式であること


## 戻り値
キー`x`に対応する値を返す。対応する要素が存在しない場合は、要素を値初期化して参照を返す。


## 例外
ハッシュ関数以外から例外が投げられた場合には、対応する要素がない場合の新規要素の挿入処理は実施されない。


## 計算量
- 平均： 定数時間
- 最悪： [`size`](size.md) について線形時間


## 備考
- (3) :
    - `is_transparent`は、標準ライブラリの[`std::less`](/reference/functional/less.md)、[`std::greater`](/reference/functional/greater.md)といった関数オブジェクトの、`void`に対する特殊化で定義される。それ以外のテンプレートパラメータで`is_transparent`が定義されないのは、互換性のためである。
    - これらのオーバーロードは、`map<string, int>`のようなコンテナに対し、検索操作で文字列リテラルを渡した際に、キー型の一時オブジェクトが生成されるコストを減らすためにある。


## 例
```cpp example
#include <iostream>
#include <unordered_map>

template<class Container, class T>
void at_wrap(Container &c, T v) {

  std::cout << "{" << c[v] << "}" << std::endl;
}

int main()
{
  std::unordered_map<int, char> um;
  um.insert(std::make_pair(1,'a'));

  std::cout << "size=" << um.size() << std::endl;

  at_wrap(um, 1);
  at_wrap(um, 2);

  std::cout << "size=" << um.size() << std::endl;

  return 0;
}
```
* c[v][color ff0000]
* um.insert[link insert.md]
* um.size()[link size.md]

### 出力
```
size=1
{a}
{}
size=2
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]

## 関連項目

| 名前                        | 説明           |
|-----------------------------|----------------|
| [`operator=`](op_assign.md) | 代入演算子     |
| [`insert`](insert.md)       | 要素を挿入する |


## 参照
- [P2363R5 Extending associative containers with the remaining heterogeneous overloads](http://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2363r5.html)
    - C++26で`template <class K>`のバージョンが追加された
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
