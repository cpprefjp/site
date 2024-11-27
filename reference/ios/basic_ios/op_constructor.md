# コンストラクタ
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]

```cpp
public:
  explicit basic_ios(basic_streambuf<char_type, traits_type>* sb);      // (1)

protected:
  basic_ios();                                                          // (2)

private:
  basic_ios(basic_ios&);                                                // (3) 宣言のみ、C++03 まで
public:
  basic_ios(basic_ios&) = delete;                                       // (3) C++11 から
```


## 概要
ストリームオブジェクトを構築する。


## 効果
- (1) [`basic_ios`](../basic_ios.md) オブジェクトを構築し、[`init`](init.md)`(sb)` を呼び出して各メンバを初期化する。
- (2) デフォルトコンストラクタ。  
    構築が完了した時点では、本オブジェクトの各メンバの値は不定である。  
    本オブジェクトの各メンバは、初めて使用する時かデストラクタが呼ばれる時のいずれか早い方の前までに [`basic_ios`](../basic_ios.md)`::`[`init`](../basic_ios/init.md) を呼び出して初期化しなければならない。  
    さもなければ、未定義動作を引き起こす。
- (3) コピーコンストラクタ。コピー構築不可。  
    [`basic_ios`](../basic_ios.md) オブジェクトをコピー構築することはできない。


## 備考
- コピーコンストラクタは、
    - C++03 : アクセス指定子`private`で宣言のみされ、定義はされない
    - C++11 : アクセス指定子`public`で`delete`定義される
    （いずれにせよコピーすることはできないが、`public` で `delete` の方が誤ってコピーしようとした際のエラーメッセージが分かりやすいため、変更されている）
- コピーコンストラクタが宣言されているため、ムーブコンストラクタも自動生成されない。
    ただし、派生クラスでムーブ構築、ムーブ代入、交換ができるように、メンバ関数 [`move`](move.md)`()`、および、[`swap`](swap.md)`()` が提供されている。


## バージョン
### 言語
- C++98


### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5.0 [mark verified], 3.6.0 [mark verified], 3.7.0 [mark verified], 3.8.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified], 4.4.7 [mark verified], 4.5.4 [mark verified], 4.6.4 [mark verified], 4.7.3 [mark verified], 4.8.1 [mark verified], 4.8.2 [mark verified], 4.9.0 [mark verified], 4.9.1 [mark verified], 4.9.2 [mark verified], 5.1.0 [mark verified], 5.2.0 [mark verified], 6.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [`basic_ios`](../basic_ios.md)`::`[`init`](init.md)
- [`basic_ios`](../basic_ios.md)`::`[`operator=`](op_assign.md)
- [`ios_base`](../ios_base.md)`::`[`ios_base`](../ios_base/op_constructor.md)
- [`ios_base`](../ios_base.md)`::`[`operator=`](../ios_base/op_assign.md)
