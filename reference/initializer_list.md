#initializer_list
* initializer_list[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template<class E>
  class initializer_list;
}
```

##概要
`<initializer_list>`ヘッダで提供される`initializer_list`クラスは、ユーザー定義型が初期化子リスト構文による初期化を可能にするための特別なクラスである。コンテナクラスの初期化、代入に使用される。


##メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------|----------------|-------|
| [`constructor`](initializer_list/op_constructor.md) | コンストラクタ | C++11 |
| `~initializer_list() = default;`                      | デストラクタ | C++11 |
| [`size`](initializer_list/size.md)                  | 要素数を取得する | C++11 |
| [`begin`](initializer_list/begin.md)                | 先頭要素へのポインタを取得する | C++11 |
| [`end`](initializer_list/end.md)                    | 最後尾要素の次を指すポインタを取得する | C++11 |


##メンバ型

| 名前 | 説明 | 対応バージョン |
|-------------------|------------|-------|
| `value_type`      | `E` | C++11 |
| `reference`       | `const E&` | C++11 |
| `const_reference` | `const E&` | C++11 |
| `size_type`       | `size_t` | C++11 |
| `iterator`        | `const E*` | C++11 |
| `const_iterator`  | `const E*` | C++11 |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|-------------------|------------|-------|
| [`begin`](initializer_list/begin_free.md) | 先頭要素へのポインタを取得する | C++11 |
| [`end`](initializer_list/end_free.md)     | 最後尾要素の次を指すポインタを取得する | C++11 |


##例
```cpp
#include <initializer_list>
#include <vector>

template <class T>
class Vector {
  std::vector<T> vec_;
public:
  Vector(std::initializer_list<T> init)
    : vec_(init.begin(), init.end()) {}
};

int main()
{
  const Vector<int> v = {1, 2, 3}; // 初期化子リストによる初期化
}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.4.0


##参照
- [N2215 Initializer lists (Rev. 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2215.pdf)
- [N2531 Initializer lists WP wording (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2531.pdf)
- [N2640 Initializer Lists — Alternative Mechanism and Rationale (v. 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2640.pdf)
- [N2672 Initializer List proposed wording](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2672.htm)
