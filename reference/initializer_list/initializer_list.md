# initializer_list
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

## 概要
`<initializer_list>`ヘッダで提供される`initializer_list`クラスは、ユーザー定義型が初期化�リスト構文による初期化を可能にするための特別なクラスである。コンテナクラスの初期化、代入に使用される。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------|----------------|-------|
| [`constructor`](initializer_list/op_constructor.md) | コンストラクタ | C++11 |
| `~initializer_list() = default;`                      | デストラクタ | C++11 |
| [`size`](initializer_list/size.md)                  | 要素数を取得する | C++11 |
| [`begin`](initializer_list/begin.md)                | 先�要素へのポインタを取得する | C++11 |
| [`end`](initializer_list/end.md)                    | 最後尾要素の次を指すポインタを取得する | C++11 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|-------------------|------------|-------|
| `value_type`      | `E` | C++11 |
| `reference`       | `const E&` | C++11 |
| `const_reference` | `const E&` | C++11 |
| `size_type`       | `size_t` | C++11 |
| `iterator`        | `const E*` | C++11 |
| `const_iterator`  | `const E*` | C++11 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|-------------------|------------|-------|
| [`begin`](initializer_list/begin_free.md) | 先�要素へのポインタを取得する | C++11 |
| [`end`](initializer_list/end_free.md)     | 最後尾要素の次を指すポインタを取得する | C++11 |


## 例
```cpp example
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
  const Vector<int> v = {1, 2, 3}; // 初期化�リストによる初期化
}
```
* std::initializer_list[color ff0000]
* init.begin()[link initializer_list/begin.md]
* init.end()[link initializer_list/end.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.4.0


## 関連項目
- [C++11 初期化�リスト](/lang/cpp11/initializer_lists.md)

