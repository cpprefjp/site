#scoped_allocator_adaptor(C++11)
```cpp
namespace std {
  template <class OuterAlloc, class... InnerAllocs>
  class scoped_allocator_adaptor : public OuterAlloc;
}
```

##概要

(ここに、クラスの概要を記載する)


##メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|-------------------------------------|-------|
| `(constructor)` | コンストラクタ | C++11 |
| `(destructor)` | デストラクタ | C++11 |
| `inner_allocator` | 内側のアロケータを取得する | C++11 |
| `outer_allocator` | 外側のアロケータを取得する | C++11 |
| `allocate` | メモリを確保する | C++11 |
| `deallocate` | メモリを解放する | C++11 |
| `max_size` | 一度に確保可能なメモリの最大サイズを取得する | C++11 |
| `construct` | オブジェクトを構築する | C++11 |
| `destroy` | オブジェクトを破棄する | C++11 |
| `select_on_container_copy_construction` | コンテナのコピー構築に必要なアロケータを取得する | C++11 |


##メンバ型

| 名前 | 説明 | 対応バージョン |
|------------------------|------------------------------|-------|
| `outer_allocator_type` | 外側のアロケータ`OuterAlloc` | C++11 |
| `inner_allocator_type` | 内側のアロケータ。 `InnerAllocs`が空だったら`scoped_allocator_adaptor<OuterAlloc>`。空じゃなければ`scoped_allocator_adaptor<InnerAllocs...>`。 | C++11 |
| `value_type`           | 要素型` allocator_traits<OuterAlloc>::value_type` | C++11 |
| `size_type`            | 要素数を表す符号なし整数型 `allocator_traits<OuterAlloc>::size_type` | C++11 |
| `difference_type`      | ポインタの差を表す符号あり整数型` allocator_traits<OuterAlloc>::difference_type` | C++11 |
| `pointer`              | 要素のポインタ型` allocator_traits<OuterAlloc>::pointer` | C++11 |
| `const_pointer`        | 読み取り専用の要素のポインタ型 `allocator_traits<OuterAlloc>::const_pointer` | C++11 |
| `void_pointer`         | `void`ポインタ型 `allocator_traits<OuterAlloc>::void_pointer` | C++11 |
| `const_void_pointer`   | 読み取り専用の`void`ポインタ型 `allocator_traits<OuterAlloc>::const_void_pointer` | C++11 |
| `propagate_on_container_copy_assignment` | コンテナのコピー代入でアロケータを置き換えるかどうかを示す論理型。<br/> `OuterAlloc::propagate_on_container_copy_assignment`が存在する場合はその型が使用され、そうでなければ[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)が使用される。 | C++11 |
| `propagate_on_container_move_assignment` | コンテナのムーブ代入でアロケータを置き換えるかどうかを示す論理型。<br/> `OuterAlloc::propagate_on_container_move_assignment`が存在する場合はその型が使用され、そうでなければ[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)が使用される。 | C++11 |
| `propagate_on_container_swap`            | コンテナの`swap`操作でアロケータを置き換えるかどうかを示す論理型。<br/> `OuterAlloc::propagate_on_container_swap`が存在する場合はその型が使用され、そうでなければ[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)が使用される。 | C++11 |
| `rebind<U>` | 型`U`を確保するように再束縛する | C++11 |


##非メンバ関数

| 名前         | 説明       | 対応バージョン |
|--------------|------------|-------|
| `operator==` | 等値比較   | C++11 |
| `operator!=` | 非等値比較 | C++11 |


##例
```cpp
#include <iostream>
#include <vector>
#include <string>

#include <scoped_allocator>
#include <boost/container/scoped_allocator.hpp>

template <class T>
using alloc = std::allocator<T>;

template <class T>
using scoped_alloc = std::scoped_allocator_adaptor<alloc<T>>;

// コンテナの要素(Inner)
using string = std::basic_string<
  char,
  std::char_traits<char>,
  alloc<char>
>;

// コンテナ(Outer)
template <class T>
using vector = std::vector<T, scoped_alloc<T>>;

int main()
{
    // stringで使用するアロケータオブジェクトを、
    // vectorでも使用する
    vector<string> v = {
        "Hello",
        "World"
    };
}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation#clang.md): 3.0
- [GCC, C++11 mode](/implementation#gcc.md): (4.8時点でサポートされてるはずだが、サンプルが動かない)
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??

###参照

