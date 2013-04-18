#default_delete
```cpp
namespace std {
  // 単一オブジェクト版
  template <class T>
  struct default_delete;

  // 配列版
  template <class T>
  struct default_delete<T[]>;
}
```

##概要
`default_delete`は、リソースを自動的に解放するスマートポインタクラスである[`unique_ptr`](/reference/memory/unique_ptr.md)において、デフォルトで使用されるデリータクラスである。`[unique_ptr](/reference/memory/unique_ptr.md)が`配列を所有できるようにするため、`T[]`時には`delete[]`を呼びだすように特殊化される。
型`T`が不完全型である場合、`operator()`の実行は不適格となる。

###単一オブジェクト版のメンバ関数

| | |
|------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| constexpr default_delete() noexcept=default; template <class U> default_delete()(default_delete<U> const& other) noexcept; | コンストラクタ。 変換可能な型からのコピーも可能。 |
| `~default_delete() = default;` | デストラクタ |
| void operator()(T* ptr) const; | 関数呼び出し演算子。渡されたポインタ`ptr`を `delete ptr;`で削除する |

###配列版のメンバ関数

| | |
|----------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| constexpr default_delete() noexcept=default; | デフォルトコンストラクタ |
| ~default_delete() = default; | デストラクタ |
| `void operator()(T* ptr) const;`  `template <class U>` `void operator()(U*) const = delete;` | 関数呼び出し演算子。渡されたポインタ`ptr`を `delete[] ptr;`で削除する |

###例
```cpp
#include <memory>

// default_deleteはunique_ptrのデフォルト引数として自動的に渡されるため、
// ここでは説明用に明示的にdefault_deleteを指定する

int main()
{
  {
    std::unique_ptr<int, std::default_delete<int>> p(new int());
    *p = 3;
  } // pが指しているintオブジェクトがdeleteされる

  {
    std::unique_ptr<int[], std::default_delete<int[]>> p(new int[3]);

    for (std::size_t i = 0; i < 3; ++i) {
      p[i] = i;
    }
  } // pが指しているint配列がdelete[]される
}
```

###出力
```cpp
```

##バージョン
```
###言語

- C++11

###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.4, 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 10.0


###参照

