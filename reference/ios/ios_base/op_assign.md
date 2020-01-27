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
オブジェクトのコピー代入を禁�する。


## 効果
コピー代入演算�。コピー代入不可。  
    [`ios_base`](../ios_base.md) オブジェクトをコピー代入することはできない。


## 備考
- コピー代入演算�は `private` で未定義（C++03 まで）、あるいは、`public` で `delete`（C++11 から）である。  
    （いずれにせよコピーすることはできないが、`public` で `delete` の方が誤ってコピーしようとした際のエラーメッセージが分かりやすいため、変更されている）
- コピー代入演算�が宣言されているため、ムーブ代入演算�も自動生成されない。


## バージョン
## 言語
- C++98

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5.0, 3.6.0, 3.7.0, 3.8.0
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0, 4.9.1, 4.9.2, 5.1.0, 5.2.0, 6.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [`ios_base`](../ios_base.md)`::`[`ios_base`](op_constructor.md)
- [`ios_base`](../ios_base.md)`::`[`~ios_base`](op_destructor.md)
- [`basic_ios`](../basic_ios.md)
- [`basic_ios`](../basic_ios.md)`::`[`basic_ios`](../basic_ios/op_constructor.md)
- [`basic_ios`](../basic_ios.md)`::`[`init`](../basic_ios/init.md)
