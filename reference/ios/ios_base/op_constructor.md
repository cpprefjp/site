# コンストラクタ
* ios[meta header]
* function[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
protected:
  ios_base();                               // (1)
private:
  ios_base(const ios_base&);                // (2) 宣言のみ、C++03 まで
public:
  ios_base(const ios_base&) = delete;       // (2) C++11 から
```

## 概要
オブジェクトを構築する。


## 効果
- (1) デフォルトコンストラクタ。  
    構築が完了した時点では、本オブジェクトの各メンバの値は不定である。  
    本オブジェクトの各メンバは、初めて使用する時かデストラクタが呼ばれる時のいずれか早い方の前までに [`basic_ios`](../basic_ios.md)`::`[`init`](../basic_ios/init.md) を呼び出して初期化しなければならない。  
    さもなければ、未定義動作を引き起こす。
- (2) コピーコンストラクタ。コピー構築不可。  
    [`ios_base`](../ios_base.md) オブジェクトをコピー構築することはできない。


## 備考
- コンストラクタが `protected` であることからも分かるとおり、[`ios_base`](../ios_base.md) は直接使用するのではなく継承されることを想定している。  
    通常は、[`ios_base`](../ios_base.md)、あるいは、その直接の派生クラスである [`basic_ios`](../basic_ios.md) を直接継承するのではなく、[`basic_istream`](../../istream/basic_istream.md)、[`basic_ostream`](../../ostream/basic_ostream.md)、[`basic_iostream`](../../istream/basic_iostream.md) のいずれかを継承することになるだろう。
- コピーコンストラクタは、
    - C++03 : アクセス指定子`private`で宣言のみされ、定義はされない
    - C++11 : アクセス指定子`public`で`delete`定義される
    （いずれにせよコピーすることはできないが、`public` で `delete` の方が誤ってコピーしようとした際のエラーメッセージが分かりやすいため、変更されている）
- コピーコンストラクタが宣言されているため、ムーブコンストラクタも自動生成されない。


## バージョン
## 言語
- C++98

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5.0 [mark verified], 3.6.0 [mark verified], 3.7.0 [mark verified], 3.8.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified], 4.4.7 [mark verified], 4.5.4 [mark verified], 4.6.4 [mark verified], 4.7.3 [mark verified], 4.8.1 [mark verified], 4.8.2 [mark verified], 4.9.0 [mark verified], 4.9.1 [mark verified], 4.9.2 [mark verified], 5.1.0 [mark verified], 5.2.0 [mark verified], 6.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [`ios_base`](../ios_base.md)`::`[`~ios_base`](op_destructor.md)
- [`basic_ios`](../basic_ios.md)
- [`basic_ios`](../basic_ios.md)`::`[`basic_ios`](../basic_ios/op_constructor.md)
- [`basic_ios`](../basic_ios.md)`::`[`init`](../basic_ios/init.md)
