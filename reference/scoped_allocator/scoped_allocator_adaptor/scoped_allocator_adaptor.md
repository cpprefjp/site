#コンストラクタ (C++11)
```cpp
scoped_allocator_adaptor();                                                 // (1)

template <class OuterA2>
scoped_allocator_adaptor(
  OuterA2&& outerAlloc,
  const InnerAllocs&... innerAllocs) noexcept;                              // (2)

scoped_allocator_adaptor(
  const scoped_allocator_adaptor& other) noexcept;                          // (3)

scoped_allocator_adaptor(
  scoped_allocator_adaptor&& other) noexcept;                               // (4)

template <class OuterA2>
scoped_allocator_adaptor(
  const scoped_allocator_adaptor<OuterA2, InnerAllocs...>& other) noexcept; // (5)

template <class OuterA2>
scoped_allocator_adaptor(
  scoped_allocator_adaptor<OuterA2, InnerAllocs...>&& other) noexcept;      // (6)
```

##scoped_allocator_adaptorオブジェクトの構築
- (1) : デフォルト構築。各アロケータオブジェクトを値初期化する。
- (2) : 外側のアロケータ、内側のアロケータという順番で、各アロケータオブジェクトを受け取る。
- (3) : コピー構築。`other`が持つアロケータオブジェクトを`*this`にコピーする。
- (4) : ムーブ構築。`other`が持つアロケータオブジェクトを`*this`にムーブする。
- (5) : 変換可能な外側のアロケータを持つ`scoped_allocator_adaptor`オブジェクトからのコピー構築。
- (6) : 変換可能な外側のアロケータを持つ`scoped_allocator_adaptor`オブジェクトからのムーブ構築。


##要件
- (2), (5), (6) : クラステンプレートのパラメータ`OuterAlloc`は、テンプレートパラメータの型`OuterA2`から構築可能であること。


##効果
- (1) : 外側と内側のアロケータオブジェクトを値初期化する。
- (2) : 外側のアロケータを[`std::forward`](/reference/utility/forward.md)`<OuterA2>(outerAlloc)`でムーブ構築する。内側のアロケータオブジェクトはコピー構築する。
- (3) : `other`が持つアロケータオブジェクトを、`*this`の対応する各アロケータオブジェクトにコピーする。
- (4) : `other`が持つアロケータオブジェクトを、`*this`の対応する各アロケータオブジェクトにムーブする。
- (5) : `other`が持つアロケータオブジェクトを、`*this`の対応する各アロケータオブジェクトにコピーする。
- (6) : `other`が持つアロケータオブジェクトを、`*this`の対応する各アロケータオブジェクトにムーブする。



##例
```cpp
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation#clang.md): 3.0
- [GCC, C++11 mode](/implementation#gcc.md): 4.7.3
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??
