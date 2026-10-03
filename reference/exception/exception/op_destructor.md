# デストラクタ
* exception[meta header]
* std[meta namespace]
* exception[meta class]
* function[meta id-type]

```cpp
virtual ~exception() throw();   // (1) C++98
virtual ~exception();           // (1) C++11
constexpr virtual ~exception(); // (1) C++26
```

## 概要
`exception`オブジェクトを破棄する。


## 例外
投げない


## 備考
- C++11で、宣言から例外指定が削除された。`noexcept`指定を書かないデストラクタは、メンバ・基底クラスのデストラクタがいずれも例外を投げないのであれば例外を投げないものとなるため、このデストラクタは暗黙に`noexcept`である


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)
