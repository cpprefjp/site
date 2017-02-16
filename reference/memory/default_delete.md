#default_delete
* memory[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

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
`default_delete`は、リソースを自動的に解放するスマートポインタクラスである[`unique_ptr`](/reference/memory/unique_ptr.md)において、デフォルトで使用されるデリータクラスである。[`unique_ptr`](/reference/memory/unique_ptr.md)が配列を所有できるようにするため、`T[]`時には`delete[]`を呼びだすように特殊化される。

型`T`が不完全型である場合、`operator()`の実行は不適格となる。


##単一オブジェクト版のメンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `constexpr default_delete() noexcept=default;`<br/>`template <class U> default_delete()(default_delete<U> const& other) noexcept;` | コンストラクタ。 変換可能な型からのコピーも可能。 | C++11 |
| `~default_delete() = default;` | デストラクタ | C++11 |
| `void operator()(T* ptr) const;` | 関数呼び出し演算子。渡されたポインタ`ptr`を `delete ptr;`で削除する | C++11 |


##配列版のメンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `constexpr default_delete() noexcept=default;` | デフォルトコンストラクタ | C++11 |
| `~default_delete() = default;` | デストラクタ | C++11 |
| `void operator()(T* ptr) const;`<br/>`template <class U>`<br/>`void operator()(U*) const = delete;` | 関数呼び出し演算子。渡されたポインタ`ptr`を `delete[] ptr;`で削除する | C++11 |


##例
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
* std::default_delete[color ff0000]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.4, 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0


##参照

