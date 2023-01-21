# operator void**
* memory[meta header]
* std[meta namespace]
* out_ptr_t[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
operator void**() const noexcept;
```

## 概要
`Pointer`型の[説明用メンバ変数](op_constructor.md)へのポインタ値を、`void**`型にキャストして取得する。


## テンプレートパラメータ制約
[`is_same_v`](/reference/type_traits/is_same.md)`<Pointer, void*>`が`false`であること


## 適格要件
[`is_pointer_v`](/reference/type_traits/is_pointer.md)`<Pointer>`が`true`であること


## 事前条件
`*this`の[`operator Pointer*()`](op_pointer.md)が呼び出されていないこと


## 戻り値
次のポインタ値`v`を返す :

- 初期値`*v`は`static_cast<void*>(p)`と等価であり、かつ
- `*this`の後続変更に続かない`*v`の変更は、`static_cast<void*>(p) == *v`のように、`*this`[デストラクト中](op_destructor.md)の`p`の値に影響を与える。


## 例外
投げない


## 備考
`*this`の生存期間外での`*v`へのアクセスは未定義動作


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`out_ptr()`](../out_ptr.md)


## 参照
- [P1132R8 out_ptr - a scalable output pointer abstraction](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1132r8.html)
