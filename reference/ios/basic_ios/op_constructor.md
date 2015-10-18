#コンストラクタ
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


##概要
ストリームオブジェクトを構築する。


##効果
- (1) [`basic_ios`](../basic_ios.md) オブジェクトを構築し、[`init`](init.md)`(sb)` を呼び出して各メンバを初期化する。
- (2) デフォルトコンストラクタ。  
    構築が完了した時点では、本オブジェクトの各メンバの値は不定である。  
    本オブジェクトの各メンバは、初めて使用する時かデストラクタが呼ばれる時のいずれか早い方の前までに [`basic_ios`](../basic_ios.md)`::`[`init`](../basic_ios/init.md) を呼び出して初期化しなければならない。  
    さもなければ、未定義動作となる。
- (3) コピーコンストラクタ。コピー不可。  
    [`basic_ios`](../basic_ios.md) オブジェクトをコピーすることはできない。


##バージョン
###言語
- C++98


##参照
- [`basic_ios`](../basic_ios.md)`::`[`init`](init.md)
- [`ios_base`](../ios_base.md)`::`[`ios_base`](../ios_base/op_constructor.md)
