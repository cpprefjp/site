#initializer_list
```cpp
namespace std {
  template<class E>
  class initializer_list;
}
```

##概要

`<initializer_list>`ヘッダで提供される`initializer_list`クラスは、ユーザー定義型が初期化子リスト構文による初期化を可能にするための特別なクラスである。コンテナクラスの初期化、代入に使用される。

###メンバ関数

| | |
|-----------------------------------------------|-----------------------------------------------------------|
| `initializer_list() noexcept;` | コンストラクタ |
| `~initializer_list() = default;` | デストラクタ |
| `size_t size() const noexcept;` | 要素数を取得する |
| `const E* begin() const noexcept;` | 先頭要素へのポインタを取得する |
| `const E* end() const noexcept;` | 最後尾要素の次を指すポインタを取得する |

###メンバ型

| | |
|------------------------------|-----------------------|
| `value_type` | `E` |
| `reference` | `const E&` |
| `const_reference` | `const E&` |
| `size_type` | `size_t` |
| `iterator` | `const E*` |
| `const_iterator` | `const E*` |

###非メンバ関数

| | |
|------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| `template <class E>` `const E* begin(initializer_list<E> il) noexcept;` | 先頭要素へのポインタを取得する |
| `template <class E>` `const E* end(initializer_list<E> il) noexcept;` | 最後尾要素の次を指すポインタを取得する |


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
- [GCC, C++0x mode](/implementation#gcc.md): 4.4.0


###参照

