#コンストラクタ
* ios[meta header]
* function[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
protected:
  ios_base();                               // (1)
private:
  ios_base(const ios_base&);                // (2) C++03 まで
public:
  ios_base(const ios_base&) = delete;       // (2) C++11 から
```

##概要
オブジェクトを構築する。


##効果
- (1) 構築が完了した時点では、本オブジェクトの各メンバの値は不定である。  
    本オブジェクトの各メンバは、初めて使用する時かデストラクタが呼ばれる時のいずれか早い方の前までに [`basic_ios`](../basic_ios.md)`::`[`init`](../basic_ios/init.md.nolink) を呼び出して初期化しなければならない。  
    さもなければ、未定義動作となる。
- (2) [`ios_base`](../ios_base.md) オブジェクトをコピーすることはできない。


##備考
- コンストラクタが `protected` であることからも分かるとおり、[`ios_base`](../ios_base.md) は直接使用するのではなく継承されることを想定している。  
    通常は、[`ios_base`](../ios_base.md) を直接継承するのではなく、派生クラスである [`basic_ios`](../basic_ios.md) を継承することになるだろう。
- コピーコンストラクタは `private` で未定義（C++03 まで）、あるいは、`public` で `delete`（C++11 から）である。  
    （いずれにせよコピーすることはできないが、`public` で `delete` の方が誤ってコピーしようとした際のエラーメッセージが分かりやすいため、変更されている）


##バージョン
##言語
- C++98

###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5.0, 3.6.0, 3.7.0, 3.8.0
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0, 4.9.1, 4.9.2, 5.1.0, 5.2.0, 6.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
- [`ios_base`](../ios_base.md)`::`[`~ios_base`](op_destructor.md.nolink)
- [`basic_ios`](../basic_ios.md)
- [`basic_ios`](../basic_ios.md)`::`[`basic_ios`](../basic_ios/op_constructor.md.nolink)
- [`basic_ios`](../basic_ios.md)`::`[`init`](../basic_ios/init.md.nolink)
