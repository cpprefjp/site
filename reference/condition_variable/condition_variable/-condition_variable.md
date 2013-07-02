#デストラクタ(C++11)
```cpp
~condition_variable();
```

##概要
`condition_variable`オブジェクトの破棄を行う


##要件
`*this`を参照している全てのスレッドがブロッキングされていないこと。
つまり、デストラクタが呼び出される前に、`*this`の`condition_variable`オブジェクトを待機している全てのスレッドに起床通知を送らなければならない。


##効果
条件変数を破棄する


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
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


