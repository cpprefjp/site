# operator=
* ios[meta header]
* function[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
private:
  ios_base& operator=(const ios_base&);                 // 宣言のみ、C++03 まで
public:
  ios_base& operator=(const ios_base&) = delete;        // C++11 から
```

## 概要
オブジェクトのコピー代入を禁止する。


## 効果
コピー代入演算子。コピー代入不可。  
    [`ios_base`](../ios_base.md) オブジェクトをコピー代入することはできない。


## 備考
- コピー代入演算子は `private` で未定義（C++03 まで）、あるいは、`public` で `delete`（C++11 から）である。  
    （いずれにせよコピーすることはできないが、`public` で `delete` の方が誤ってコピーしようとした際のエラーメッセージが分かりやすいため、変更されている）
- コピー代入演算子が宣言されているため、ムーブ代入演算子も自動生成されない。


## バージョン
## 言語
- C++98

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5.0 [mark verified], 3.6.0 [mark verified], 3.7.0 [mark verified], 3.8.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified], 4.4.7 [mark verified], 4.5.4 [mark verified], 4.6.4 [mark verified], 4.7.3 [mark verified], 4.8.1 [mark verified], 4.8.2 [mark verified], 4.9.0 [mark verified], 4.9.1 [mark verified], 4.9.2 [mark verified], 5.1.0 [mark verified], 5.2.0 [mark verified], 6.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [`ios_base`](../ios_base.md)`::`[`ios_base`](op_constructor.md)
- [`ios_base`](../ios_base.md)`::`[`~ios_base`](op_destructor.md)
- [`basic_ios`](../basic_ios.md)
- [`basic_ios`](../basic_ios.md)`::`[`basic_ios`](../basic_ios/op_constructor.md)
- [`basic_ios`](../basic_ios.md)`::`[`init`](../basic_ios/init.md)
