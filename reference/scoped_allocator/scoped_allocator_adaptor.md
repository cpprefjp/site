#scoped_allocator_adaptor
```cpp
namespace std {
  template <class OuterAlloc, class... InnerAllocs>
  class scoped_allocator_adaptor : public OuterAlloc;
}
```

##概要

(ここに、クラスの概要を記載する)

###メンバ関数

| | |
|----------------------------------------------------|--------------------------------------------------------------------------|
| `(constructor)` | コンストラクタ |
| `(destructor)` | デストラクタ |
| `inner_allocator` | 内側のアロケータを取得する |
| `outer_allocator` | 外側のアロケータを取得する |
| `allocate` | メモリを確保する |
| `deallocate` | メモリを解放する |
| `max_size` | 一度に確保可能なメモリの最大サイズを取得する |
| `construct` | オブジェクトを構築する |
| `destroy` | オブジェクトを破棄する |
| `select_on_container_copy_construction` | コンテナのコピー構築に必要なアロケータを取得する |

###メンバ型

| | |
|-----------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `outer_allocator_type` | 外側のアロケータ`OuterAlloc` |
| `inner_allocator_type` | 内側のアロケータ。 `InnerAllocs`が空だったら`scoped_allocator_adaptor<OuterAlloc>`。空じゃなければ`scoped_allocator_adaptor<InnerAllocs...>`。 |
| `value_type` | 要素型` allocator_traits<OuterAlloc>::value_type` |
| `size_type` | 要素数を表す符号なし整数型` allocator_traits<OuterAlloc>::size_type` |
| `difference_type` | ポインタの差を表す符号あり整数型` allocator_traits<OuterAlloc>::difference_type` |
| `pointer` | 要素のポインタ型` allocator_traits<OuterAlloc>::pointer` |
| `const_pointer` | 読み取り専用の要素のポインタ型` allocator_traits<OuterAlloc>::const_pointer` |
| `void_pointer` | `void`ポインタ型` allocator_traits<OuterAlloc>::void_pointer` |
| `const_void_pointer` | 読み取り専用の`void`ポインタ型 `allocator_traits<OuterAlloc>::const_void_pointer` |
| `propagate_on_container_copy_assignment` | コンテナのコピー代入でアロケータを置き換えるかどうかを示す論理型。 `OuterAlloc::propagate_on_container_copy_assignment`が存在する場合はその型が使用され、そうでなければ[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)が使用される。 |
| `propagate_on_container_move_assignment` | コンテナのムーブ代入でアロケータを置き換えるかどうかを示す論理型。 `OuterAlloc::propagate_on_container_move_assignment`が存在する場合はその型が使用され、そうでなければ[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)が使用される。 |
| `propagate_on_container_swap` | コンテナの`swap`操作でアロケータを置き換えるかどうかを示す論理型。 `OuterAlloc::propagate_on_container_swap`が存在する場合はその型が使用され、そうでなければ[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)が使用される。 |
| `rebind<U>` | 型`U`を確保するように再束縛する |

###非メンバ関数

| | |
|-------------------------|-----------------|
| `operator==` | 等値比較 |
| `operator!=` | 非等値比較 |


##例
```cpp
```

###出力
```
```

##バージョン
###言語
- C++11:

###参照

