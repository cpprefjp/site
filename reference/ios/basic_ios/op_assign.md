# operator=
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]

```cpp
private:
  basic_ios& operator=(const basic_ios&);                               // 宣言のみ、C++03 まで
public:
  basic_ios& operator=(const basic_ios&) = delete;                      // C++11 から
```


## 概要
オブジェクトの代入を禁�する。


## 効果
コピー代入演算�。コピー代入不可。  
[`basic_ios`](../basic_ios.md) オブジェクトをコピー代入することはできない。


## 備考
- コピー代入演算�は `private` で未定義（C++03 まで）、あるいは、`public` で `delete`（C++11 から）である。  
    （いずれにせよコピーすることはできないが、`public` で `delete` の方が誤ってコピーしようとした際のエラーメッセージが分かりやすいため、変更されている）
- コピー代入演算�が宣言されているため、ムーブ代入演算�も自動生成されない。  
    ただし、派生クラスでムーブ構築、ムーブ代入、交換ができるように、メンバ関数 [`move`](move.md)`()`、および、[`swap`](swap.md)`()` が提供されている。


## バージョン
### 言語
- C++98


### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5.0, 3.6.0, 3.7.0, 3.8.0
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0, 4.9.1, 4.9.2, 5.1.0, 5.2.0, 6.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [`basic_ios`](../basic_ios.md)`::`[`basic_ios`](op_constructor.md)
- [`basic_ios`](../basic_ios.md)`::`[`init`](init.md)
- [`ios_base`](../ios_base.md)`::`[`ios_base`](../ios_base/op_constructor.md)
- [`ios_base`](../ios_base.md)`::`[`operator=`](../ios_base/op_assign.md)
