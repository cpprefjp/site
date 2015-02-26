#owner_less (C++11)
* memory[meta header]

```cpp
namespace std {
  template <class T>
  struct owner_less; // 先行宣言

  template <class T>
  struct owner_less<shared_ptr<T>>;

  template <class T>
  struct owner_less<weak_ptr<T>>;
}
```
* shared_ptr[link /reference/memory/shared_ptr.md]
* weak_ptr[link /reference/memory/weak_ptr.md]

##概要
`owner_less`は、スマートポインタを所有権ベースで小なり比較するための、2項関数オブジェクトである。

スマートポインタを、[`set`](/reference/set/set.md)や[`map`](/reference/map/map.md)のキーにする際、値ベースではなく所有権ベースに比較することを指定するために使用する。


##shared_ptr版
###メンバ関数

| 名前                                    | 説明               | 対応バージョン |
|-----------------------------------------|--------------------|-------|
| [`operator()`](./owner_less/op_call.md) | 関数呼び出し演算子 | C++11 |


###メンバ型

| 名前 | 説明 | 対応バージョン |
|------------------------|---------------------------------------------------------------|-------|
| `result_type`          | 戻り値型`bool`                                                | C++11 |
| `first_argument_type`  | 第1引数型[`shared_ptr`](/reference/memory/shared_ptr.md)`<T>` | C++11 |
| `second_argument_type` | 第2引数型[`shared_ptr`](/reference/memory/shared_ptr.md)`<T>` | C++11 |


##weak_ptr版
###メンバ関数

| 名前                                    | 説明               | 対応バージョン |
|-----------------------------------------|--------------------|-------|
| [`operator()`](./owner_less/op_call.md) | 関数呼び出し演算子 | C++11 |


###メンバ型

| 名前 | 説明 | 対応バージョン |
|------------------------|-----------------------------------------------------------|-------|
| `result_type`          | 戻り値型`bool`                                            | C++11 |
| `first_argument_type`  | 第1引数型[`weak_ptr`](/reference/memory/weak_ptr.md)`<T>` | C++11 |
| `second_argument_type` | 第2引数型[`weak_ptr`](/reference/memory/weak_ptr.md)`<T>` | C++11 |


##例
```cpp
#include <iostream>
#include <memory>
#include <map>

template <class Key, class Value>
using shared_ptr_map = std::map<
  std::shared_ptr<Key>,
  Value,
  std::owner_less<std::shared_ptr<Key>>
>;

struct X {
  int i;
  int j;
};

int main()
{
  shared_ptr_map<int, std::string> m;

  std::shared_ptr<int> p1(new int(2));

  std::shared_ptr<X> px(new X());
  // 同じ所有権(px)を持つが、異なるポインタを指すp2とp3
  std::shared_ptr<int> p2(px, &(px->i));
  std::shared_ptr<int> p3(px, &(px->j));

  m[p1] = "Alice";
  m[p2] = "Bob";
  m[p3] = "Carol"; // owner_lessでは、p2とp3が同じリソースを
                   // 指していると見なされるので、
                   // p2の要素が上書きされる

  std::cout << m.at(p1) << std::endl;
  std::cout << m.at(p2) << std::endl;
  std::cout << m.at(p3) << std::endl;
}
```

###出力
```
Alice
Carol
Carol
```

##バージョン
###言語
- C++11

###処理系
- [GCC](/implementation.md#gcc): 4.4.7
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0

###参照
- [`shared_ptr::owner_before()`](/reference/memory/shared_ptr/owner_before.md)


